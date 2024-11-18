import { Request, Response, NextFunction } from 'express';
import { logWarn } from './logUtils';
const requestMap: Record<string, number> = {};

/**
 * Middleware to delay requests progressively after a threshold
 */
const requestRateSmoothing = (threshold: number, delayIncrement: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const clientIP = req.ip;
        const currentTime = Date.now();

        if (!requestMap[clientIP]) {
            requestMap[clientIP] = currentTime;
            next();
            return;
        }

        const timeSinceLastRequest = currentTime - requestMap[clientIP];
        if (timeSinceLastRequest < threshold) {
            const delay = delayIncrement * (threshold - timeSinceLastRequest);
            logWarn(`Rate limit exceeded. Delaying request for ${delay}ms.`);

            setTimeout(next, delay); // Delay the request
        } else {
            requestMap[clientIP] = currentTime;
            next();
        }
    };
};

export default requestRateSmoothing;
