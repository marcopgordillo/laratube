class QuestionType {
  static TEXT = new QuestionType('text');
  static TEXTAREA = new QuestionType('textarea');
  static SELECT = new QuestionType('select');
  static RADIO = new QuestionType('radio');
  static CHECKBOX = new QuestionType('checkbox');

  constructor(name) {
    this.name = name
  }

  toString() {
    return this.name
  }
}

export default QuestionType
