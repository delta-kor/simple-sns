import chalk from 'chalk';
import logSymbols from 'log-symbols';

class Log {
  private index: number = 0;

  info(message: string): void {
    console.log(chalk.yellow(this.index), chalk.blue(logSymbols.info), message);
    this.index++;
  }

  error(message: string): void {
    console.log(chalk.yellow(this.index), chalk.red(logSymbols.error), message);
    this.index++;
  }

  success(message: string): void {
    console.log(chalk.yellow(this.index), chalk.green(logSymbols.success), message);
    this.index++;
  }

  warning(message: string): void {
    console.log(chalk.yellow(this.index), chalk.yellow(logSymbols.warning), message);
    this.index++;
  }
}

export default new Log();
