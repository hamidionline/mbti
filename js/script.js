const pairs = ['EI', 'SN', 'TF', 'JP'];
const anwserPairs = ['EI', 'SN', 'SN', 'TF', 'TF', 'JP', 'JP'];

const characteristic = {
  E: 'Extraversion (Hướng ngoại)',
  I: 'Introversion (Hướng nội)',
  S: 'Sensing (Giác quan)',
  N: 'iNtuition (Trực giác)',
  T: 'Thinking (Lý trí)',
  F: 'Feeling (Cảm xúc)',
  J: 'Judging (Nguyên tắc)',
  P: 'Perceiving (Linh hoạt)'
};

let hash = {
  E: 0,
  I: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0
};
let questions = getQuestion();
let characteristicsHash = getCharacteristicsHash();
let index = 0;

//init

(() => {
  $('#exercise').hide();
})();

//end init

$('#start').click(function () {
  startQuestion();
});

$(document).on('click', 'li.option', function () {
  let index = $(this).data('index') - 0;
  let option = $(this).data('option') - 0;
  answer(index, option);
});
