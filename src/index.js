$(document).ready(function() {
  // construct the board with 2 rows and 4 boxes
  const board = '<div id="board"></div>';
  $('body').append(board);
  const row = '<div class="row"></div>';
  for (let i = 0; i < 2; i++) {
    $('#board').append(row);
  }
  $('.row').first().append('<div class="box" id="b1"></div>');
  $('.row').first().append('<div class="box" id="b2"></div>');
  $('.row').last().append('<div class="box" id="b3"></div>');
  $('.row').last().append('<div class="box" id="b4"></div>');

  // construct a reset button, a save state button, and get state button
  $('body').append('<button id="reset_button">Reset Numbers</button>');
  $('body').append('<button id="save_button">Save Numbers</button>');
  $('body').append('<button id="get_button">Get Saved Numbers</button>');
  // initial numbers set to 0
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;

  $('#b1').text(b1);
  $('#b2').text(b2);
  $('#b3').text(b3);
  $('#b4').text(b4);

  // when clicking a .box increase current number by 1
  $('.box').on('click', function() {
    let curr = Number($(this).text());
    curr += 1;
    $(this).text(curr);
  });

  // reset numbers to 0 when pressing reset_button
  $('#reset_button').on('click', function() {
    $('.box').text('0');
  });

  // save numbers when pressing save_button
  $('#save_button').on('click', function() {
    const box1 = Number($('#b1').text());
    const box2 = Number($('#b2').text());
    const box3 = Number($('#b3').text());
    const box4 = Number($('#b4').text());

    let body = {
      "query": `mutation numberSaver {post: saveNums(box1: ${box1}, box2: ${box2}, box3: ${box3}, box4: ${box4}) { box1 box2 box3 box4 } }`
    };

    $.post('/graphql', body, (res) => {
      console.log('saved:', res);
    });

    // axios({
    //   method: 'post',
    //   url: '/graphql',
    //   data:  body
    // }).then((result) => {
    //   console.log('hello from post request: ', result.data.data);
    // });

  });

  $('#get_button').on('click', function() {
    let body = {
      "query": "query { getNums { box1, box2, box3, box4} }" 
    };

    $.post('/graphql', body, (res) => {
      console.log('retrieved:', res.data);
      const b1 = res.data.getNums.box1;
      const b2 = res.data.getNums.box2;
      const b3 = res.data.getNums.box3;
      const b4 = res.data.getNums.box4;
      $('#b1').text(b1);
      $('#b2').text(b2);
      $('#b3').text(b3);
      $('#b4').text(b4);
    })
  });
});