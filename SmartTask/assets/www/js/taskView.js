/**
 * taskView.js 
 */

/**
 * タスクビュー
 * @param {String} name タスクモデル
 */
var TasksView = function(taskModel) {
  this.model = taskModel;
  this.tasksId = $('#main-header ul');
  this.taskId = $('#main-content ul');
};

/**
 * 初期化する 
 */
TasksView.prototype.initialize = function() {
  // ビュー表示
  this.viewNavi();
  this.viewCurrent();
  
  that = this;
  
  // タスクナビをクリック
  $(document).on('vclick', '#main-header ul li', function() {
    // 現在位置を設定する
    var current = that.tasksId.find('li').index($(this));
    that.model.setCurrent(current);
  });
  
  // タスクをクリック
  $(document).on('click', '#main-content ul li', function() {
    // 現在位置を設定する
    var checked = that.taskId.find('li').index($(this));
    that.model.toggleTask(checked);
  });
  
  // 完了ボタンをクリック
  $(document).on('vclick', '#complete', function() {
    // 現在位置を設定する
    that.model.deleteCurrentChecked();
  });
  
  // 編集ボタンをクリック
  $(document).on('vclick', '#edit', function() {
    // テキストエリアを表示
    var html = '<textarea name="textarea" id="edit-textarea">';
    // 既存のタスクを表示
    $.each(that.model.getCurrentTask(), function(i, obj) {
      html += obj.checked? '■':'□';
      html += obj.name + '\n';
    });
    html += '</textarea>';
    
//    html += '<a data-type="button" data-icon="check" id="edit-end" class="ui-btn-right">編集完了</a>';
        
    $('#main-content').empty().append(html).trigger('create');
    
    // 編集完了ボタンを表示
    $(this).text('編集完了').attr({'id': 'edit-end', 'data-icon': 'check'}).trigger('create');
  });
  
  // 編集終了ボタンをクリック
  $(document).on('vclick', '#edit-end', function() {
    // テキストをタスクとして保存
    var text = $('#edit-textarea').text();
    
    task = [];
    tasks = [
      {name: 'テスト１', checked: true}, {name: '試してみる', checked: false}
    ];
    
    name = '';
    checked = false;
    for (var i=0; i < text.length; i++) {
      // タスク一つを生成
      if (text[i] === '□' || text[i] === '■') {
        if (name !== '') {
          task.push({name: name, checked: checked});
          name = '';
        }
        checked = (text[i] === '□'? false:true);
      } else if (text[i] === '\n') {
      } else {
        name += text[i];
      }
    };
    task.push({name: name, checked: checked});
    that.model.setCurrentTask(task);
    
    // リストを表示
    var html = '<ul data-role="listview"></ul>';
    $('#main-content').empty().append(html).trigger('create');
    that.taskId = $('#main-content ul');
    
    // 現在のタスクを表示
    that.viewCurrentTask();
    
    // 編集完了ボタンを表示
    $(this).text('編集').attr({'id': 'edit', 'data-icon': 'edit'}).trigger('create');
  });
};

/**
 * タスクナビを表示する 
 */
TasksView.prototype.viewNavi = function() {
  var html = '';
  $.each(this.model.getAll(), function(i, tasks) {
    html += '<li>' + tasks.name + '</li>';
  });
  this.tasksId.empty().append(html).listview('refresh');
  
  // 現在地を先頭にする
  this.model.setCurrent(0);
};

/**
 * タスクを表示する
 */
TasksView.prototype.viewCurrentTask = function() {
  var html = '';
  $.each(this.model.getCurrentTask(), function(i, obj) {
    html += '<li';
    if (obj.checked) {    // チェック済みのタスク
      html += ' class="checked"';
    }
    html += '>' + obj.name + '</li>';
  });
  this.taskId.empty().append(html).listview('refresh');
  
  // 完了ボタンの状態を切り替える
  this.checkCompleteStatus();
};

/**
 * 現在位置を表示する 
 */
TasksView.prototype.viewCurrent = function() {
  // 現在位置を表示する
  var current = this.model.getCurrent();
  this.tasksId.find('li').removeClass('ui-btn-active ui-state-persist');
  this.tasksId.find('li').eq(current).addClass('ui-btn-active ui-state-persist');
  
  // 現在位置のタスクを表示する
  this.viewCurrentTask();
};

/**
 * 完了ボタンの状態を切り替える
 */
TasksView.prototype.checkCompleteStatus = function() {
  var $button = $('#complete');
  
  // チェック済みのタスクがあるとき、ボタンをアクティブにする
  $button.addClass('ui-disabled');
  $.each(this.model.getCurrentTask(), function(i, obj) {
    if (obj.checked) {
      $button.removeClass('ui-disabled');
      return;
    }
  });
};

/**
 * タスクMVCを初期化する 
 */
function taskMVC() {
  var taskModel = new TasksEnvelop();
  var taskView = new TasksView(taskModel);
  taskModel.setView(taskView);
  taskView.initialize();
}