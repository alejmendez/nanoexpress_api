class Benchmark {
  static startTime: [number, number];

  static start() {
    Benchmark.startTime = process.hrtime();
    return Benchmark.startTime;
  }

  static end(startTime: [number, number] = Benchmark.startTime): string {
    return Benchmark.getProcessingTimeInMS(process.hrtime(startTime));
  }

  static getProcessingTimeInMS(time: [number, number]): string {
    return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`;
  }
}
export default Benchmark;
