/**
 *  task.js
 */
var tasks;      // 未完了タスク
var tasks_comp; // 完了済みタスク

// 未完了のタスクを描画する
function updateViewTask() {
  var $flipsnap = $('.flipsnap');
  // Get tasks from storage
  tasks = JSON.parse(localStorage.tasks);
  
  // アイテムを描画する    
  var html = '';
  for (i=0; i < tasks.length; i++) {
    if (i % 9 == 0) {
    html +=
      '<div class="item">' +
        '<ul data-role="listview">' +
        '</ul>' +
      '</div>';
      $flipsnap.html(html).trigger('create');
    }
  }
  
  // Create the main listview
  var itemId = 0;
  html = '';
  for (i=0; i < tasks.length; i++) {
    html += '<li id="task' + i + '" data-icon="false" class="listitem ';
    
    if (tasks[i].checked === true) {
      html += ' checked">';
    } else {
      html += '">';
    }
    html += '<a>' + tasks[i].name + '</a></li>';
      
    if (i % 9 == 8) {
//        $('#main-listview'+ itemId).empty().append(html).listview('refresh');
      $flipsnap.find('.item').eq(itemId).find('ul').empty().append(html).listview('refresh');
      html = '';
      itemId++;
    }
  }
  $flipsnap.find('.item').eq(itemId).find('ul').empty().append(html).listview('refresh');
  
  flipsnap_custom.updateWidth();
}

// 完了済みタスクの描画
function updateViewTaskComp() {
  tasks_comp = JSON.parse(localStorage.tasks_comp);
  
  // Create the main listview
  var html = '';
  for (i=0; i < tasks_comp.length; i++) {
    html += '<li id="tasks_comp' + i + '" class="listitem" data-icon="false">';
    
    html += '<a>' + tasks_comp[i].name + '</a></li>';
  }
  $('#completedlistview').empty().append(html).listview('refresh');
  
  // 完了タスク数表示
  $('#completedFooter').find('p').text(tasks_comp.length);
}

// Enable complete button to be clicked
function enableComplete() {
    $("#complete").removeClass("ui-disabled");
}
// Disable complete button to be clicked
function disableComplete() {
    $("#complete").addClass("ui-disabled");
}
// If checked tasks are, enable complete button to be clicked
function checkCompleteStat() {
  for (i=0; i < tasks.length; i++) {
    if (tasks[i].checked === true) {
      enableComplete();
      return;
    }
  }
  disableComplete();
}
// タスクの状態を切り替える
function toggleTask(event) {
}

// チェック済みタスクを削除する
function deleteCheckedTask() {
  tasks_comp = JSON.parse(localStorage.tasks_comp);
      
  for (i=0; i < tasks.length; i++) {
    if (tasks[i].checked === true) {
      
      tasks_comp.unshift({ "name": tasks[i].name });
      
      tasks.splice(i,1);
      i--;
    }
  }
  localStorage.tasks = JSON.stringify(tasks);
  localStorage.tasks_comp = JSON.stringify(tasks_comp);
}


// Task was clicked
$(document).on('click', '.listitem', function(event) {
  var checked = tasks[this.id.substr(4)].checked;
  tasks[this.id.substr(4)].checked = !checked;
  localStorage.tasks = JSON.stringify(tasks);
  if (tasks[this.id.substr(4)].checked) {
    $(event.currentTarget).addClass("checked");
  } else {
    $(event.currentTarget).removeClass("checked");
  }
  toggleTask(event);
  checkCompleteStat();
});
  
// Task was tapholded
/*    $(document).on('taphold', '.listitem', function() {
      
      if(confirm("タスクを削除しますか？")){
        tasks.splice(this.id.substr(4),1);
      }
      localStorage.tasks = JSON.stringify(tasks);
      
      updateViewTask();
      checkCompleteStat();
    });
*/
// AddButton was clicked
$(document).on('vclick', '#add', function() {
  // Input task text
  var name = window.prompt("Input text", '');    
  if(name == '' || name == null) {
    return;
  }
    
  // Save new task
//      task.unshift({ "name": name, "checked": false });
  tasks.push({ "name": name, "checked": false });      
  localStorage.tasks = JSON.stringify(tasks);
  
  updateViewTask();
});



// CompleteButton was clicked
$(document).on('vclick', '#complete', function() {
  deleteCheckedTask();
  updateViewTask();
  disableComplete();
});

//CompletedButton was clicked
$(document).on('vclick', '#completed', function() {
  updateViewTaskComp();
});

  
// 傾き検知時
$(document).on('pageinit', function() {
  flipsnap_custom.updateWidth();
  updateViewTask();
  checkCompleteStat();
});

// ウィンドウサイズ変更時
$(window).resize(function() {
  flipsnap_custom.updateWidth();
});




/**----------------------------------------------------------
 * For debug 
 */
/*  tasks = [
    { "name": "デスクトップバックアップ", "checked": false },
    { "name": "クロージャ調査", "checked": false },
    { "name": "追加→テキスト入力ダイアログ", "checked": true },
    { "name": "完了ボタン表示／非表示", "checked": true },
    { "name": "タスクが？以上あると次のitemへ移動", "checked": false },
    { "name": "完了タスクの表示", "checked": false },
  ];
  localStorage.tasks = JSON.stringify(tasks);
  
  tasks_comp = [
    { "name": "タスク完了" },
  ];
  localStorage.tasks_comp = JSON.stringify(tasks_comp);
*/  
//-----------------------------------------------------------




/*
(function(){
  
  var canv = new Canvas;
});


var Canvas = function() {
  this.oldx;
  this.oldy;
  this.canvas_top = 20;
  this.colors = ["black","red","blue"];
  this.color_index = 0;

  // Canvasのコンテキストを取得する
  canvas = $("#canv1");
  this.ctx = canvas.getContext("2d");
  this.ctx.strokeWidth = 2;
  this.ctx.strokeStyle = "black";
  
  
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(100, 100);
    this.ctx.stroke();
  
  
  // ユーザーのタッチイベントに反応する
  canvas.addEventListener("mousemove",
    function (e) { drawLine(e, false); } );
  canvas.addEventListener("mousedown",
    function (e) { drawLine(e, true); } );
  canvas.addEventListener("mouseup",
    function (e) { drawLine(e, true); } );
  
  canvas.ontouchstart = function (e) { drawLine(e, true);  };
  canvas.ontouchmove  = function (e) { drawLine(e, false); };
  canvas.ontouchend   = function (e) { drawLine(e, false); };
  
  // タイトルクリックで描画色を変える
  $("#title").onclick = function() {
    var cur = colors[(++color_index) % colors.length];
    $("#title").style.backgroundColor = cur;
    this.ctx.strokeStyle = cur;
  };
};

Canvas.prototype = {
  // 線の太さ変更
  setLineWidth : function(width) {
    this.ctx.lineWidth = width;
  },
  // 線の色変更
  setLineColor : function(color) {
    this.ctx.strokeStyle = color;
  },
  // イベントを処理して描画を行う
  drawLine : function(event, isStart) {
    event.preventDefault();
    if (event.touches.length == 0) return;
    var t = event.touches[0];
    var mx = t.pageX;
    var my = t.pageY - canvas_top;
    if (isStart) {
      oldx = mx - 1;
      oldy = my - 1;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(oldx, oldy);
    this.ctx.lineTo(mx, my);
    this.ctx.stroke();
    this.oldx = mx;
    this.oldy = my;
  }
};
// function clearCanvas() {
  // ctx.clearRect(0,0 - canvas_top,canvas.width(),canvas.height());
// };*/