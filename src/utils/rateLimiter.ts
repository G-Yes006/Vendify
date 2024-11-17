import { Request, Response, NextFunction } from 'express';

interface RateLimiterRecord {
    requests: number;
    firstRequestTime: number;
}

const rateLimiterMap: Record<string, RateLimiterRecord> = {};

/**
 * Custom rate-limiting middleware
 * @param maxRequests - Maximum number of requests allowed in the time window
 * @param windowTime - Time window in milliseconds
 */
const rateLimiter = (maxRequests: number, windowTime: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const clientKey = req.ip; // Use IP address as a unique identifier
        const currentTime = Date.now();

        if (!rateLimiterMap[clientKey]) {
            // Initialize rate limiter record for the client
            rateLimiterMap[clientKey] = { requests: 1, firstRequestTime: currentTime };
            next();
            return;
        }

        const clientData = rateLimiterMap[clientKey];
        const timeElapsed = currentTime - clientData.firstRequestTime;

        if (timeElapsed > windowTime) {
            // Reset rate limiter data after the time window has passed
            rateLimiterMap[clientKey] = { requests: 1, firstRequestTime: currentTime };
            next();
            return;
        }

        if (clientData.requests < maxRequests) {
            // Increment the request count and allow the request
            clientData.requests += 1;
            next();
        } else {
            // Deny the request and respond with rate-limit message
            res.status(429).json({ error: 'Too many requests, please try again later.' });
        }
    };
};

export default rateLimiter;
