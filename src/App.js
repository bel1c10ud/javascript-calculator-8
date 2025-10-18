import { Console } from "@woowacourse/mission-utils";

class App {
  async getInput() {
    try {
      const input = await Console.readLineAsync(
        "덧셈할 문자열을 입력해 주세요.\n"
      );
      return input;
    } catch (error) {

    }
  }
  splitInput(input) {
    const DEFAULT_SEPARATOR_REGEX = new RegExp(/,|:/);
    const numbers = input.split(DEFAULT_SEPARATOR_REGEX).map(Number);
    return numbers;
  }
  async run() {
    const input = await this.getInput();
    const numbers = this.splitInput(input);
    const result = numbers.reduce((prev, cur) => prev + cur, 0);

    Console.print(`결과 : ${result}`);  
  }
}

export default App;
