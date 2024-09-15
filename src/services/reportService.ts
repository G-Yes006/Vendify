import reportRepository from '../repositories/reportRepository';

class ReportService {
  async getSalesReport(startDate: Date, endDate: Date) {
    if (startDate >= endDate) {
      throw new Error('Invalid date range');
    }
    return await reportRepository.getSalesReport(startDate, endDate);
  }

  async getInventoryReport() {
    return await reportRepository.getInventoryReport();
  }

  async getUserInsights() {
    return await reportRepository.getUserInsights();
  }
}

export default new ReportService();
