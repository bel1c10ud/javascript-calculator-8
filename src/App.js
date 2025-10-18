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
  async run() {
    const input = await this.getInput();

    Console.print(`입력: ${input}`);
  }
}

export default App;
