const pairs = ['EI', 'SN', 'TF', 'JP'];
const anwserPairs = ['EI', 'SN', 'SN', 'TF', 'TF', 'JP', 'JP'];
let questions = stringQuestions.split('\n\n');
questions = questions.map((qs, i) => {
    let parts = qs.split('\n');
    let [title, a, b] = parts;
    let type = anwserPairs[i % anwserPairs.length];
    return {
        title: title.split('. ').slice(1).join(''),
        a: a.split(') ').slice(1).join(''),
        b: b.split(') ').slice(1).join(''),
        type
    };
});
let characteristicsHash = {};
characteristicsStr.split('\n')
    .forEach(text => {
        let parts = text.split('-');
        parts[0] = parts[0].trim();
        parts[1] = parts[1].trim();
        characteristicsHash[parts[0]] = parts[1].replace('(', ' (');
    });


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

let index = 0;

function answer(question, opt) {
    let index = parseInt(question);
    if (!Number.isNaN(index)) {
        question = questions[index];
    }
    let char = question.type[opt];
    if (!hash[char]) hash[char] = 0;
    hash[char]++;

    console.log('index', index);
    render();
}

function render() {
  $('#answers').hide();
    if (index >= questions.length) {
        return resultRender();
    }
    let question = questions[index];
    $('#title').html(`<span class="number">${index + 1}. </span>` + question.title);
    $('#answers').html(`
        <li class="option" data-index="${index}" data-option="0">
          <div> 
            <span class="answer">a</span><span class="answer-content">${question.a}</span>
          </div>
        </li>
        <li class="option" data-index="${index}" data-option="1"> 
          <div>
            <span class="answer">b</span><span class="answer-content">${question.b}</span>
          </div> 
        </li>
    `);
    $('#answers').fadeIn();
    index++;
}

function resultRender() {
    //EI
    //SN
    //TF
    //JP

    $('#result').hide();
    let text = '<div class="result-title">Phân tích kết quả: </div>';
    text += `<div class="result-list">`;
    let characteristic = {
      E: 'Extraversion (Hướng ngoại)',
      I: 'Introversion (Hướng nội)',
      S: 'Sensing (Giác quan)',
      N: 'iNtuition (Trực giác)',
      T: 'Thinking (Lý trí)',
      F: 'Feeling (Cảm xúc)',
      J: 'Judging (Nguyên tắc)',
      P: 'Perceiving (Linh hoạt)'
    };
    let result = '';
    for (let c of Object.keys(characteristic)) {
      let _html =  characteristic[c].replace(c, `<span class="tick-text">${c}</span>`);
      text += `<p class="characteristic"><span class="characteristic-number">${c}: ${hash[c]}</span> <span class="characteristic-detail">${_html}</span></p>`;
    }
    for (let pair of pairs) {
        if (hash[pair[0]] > hash[pair[1]]) {
            result += pair[0];
        } else {
            result += pair[1];
        }
    }
    text += `</div>`;

    text += `<p class="result-characteristic">Kết luận: ${result} - <a target="_blank" href="https://mbti.vn/${result}">${characteristicsHash[result]}</a></p>`;

    $('#exercise').hide();
    $('#result').html(text);
    $('#result').fadeIn();

    //Thông báo, trỏ cái link nhảy qua: 'https://mbti.vn/' + result
}

render();

$(document).on('click', 'li.option', function () {
    let index = $(this).data('index') - 0;
    let option = $(this).data('option') - 0;
    answer(index, option);
})
