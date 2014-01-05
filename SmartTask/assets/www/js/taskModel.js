/**
 * taskModel.js 
 */

/**
 * タスク一覧 
 */
TasksEnvelop = function() {
  // ビュー
  this.view;
  
  // タスク
  this.tasks = [
    {name: '仕事', task: [{name: 'テスト１', checked: true}, {name: '試してみる', checked: false}, {name: 'ｄｄｄｄ', checked: false}]},
    {name: 'アプリ', task: [{name: 'テスト', checked: false}, {name: 'テスト', checked: false}]},
  ];
  
  // 現在地
  this.current = 0;
};

/**
 * タスク一覧取得
 */
TasksEnvelop.prototype.getAll = function() {
  return this.tasks;
};

/**
 * タスク追加
 */
TasksEnvelop.prototype.add = function(name) {
  this.tasks.push({'name': name});
  
  this.view.viewNavi();
};

/**
 * 現在位置を設定する 
 */
TasksEnvelop.prototype.setCurrent = function(current) {
  this.current = current;
  
  this.view.viewCurrent();
};

/**
 * 現在位置を取得する 
 */
TasksEnvelop.prototype.getCurrent = function() {
  return this.current;
};

/**
 * 現在位置のタスクを取得する 
 */
TasksEnvelop.prototype.getCurrentTask = function() {
  return this.tasks[this.current].task;
};

/**
 * 現在地の指定タスクのチェックを切り替える
 */
TasksEnvelop.prototype.toggleTask = function(i) {
  this.tasks[this.current].task[i].checked = !this.tasks[this.current].task[i].checked;
  
  this.view.viewCurrentTask();
};
/**
 * 現在位置のタスクを設定する 
 */
TasksEnvelop.prototype.setCurrentTask = function(task) {
  this.tasks[this.current].task = task;
};

/**
 * タスク完了 
 */
TasksEnvelop.prototype.deleteCurrentChecked = function() {
  var tasksTmp = [];
  $.each(this.tasks[this.current].task, function(i, task) {
    if(task.checked === false) {
      tasksTmp.push(task);
    }
  });
  this.tasks[this.current].task = tasksTmp;
  
  this.view.viewCurrentTask();
};


/**
 * ビューを登録する
 */
TasksEnvelop.prototype.setView = function(view) {
  this.view = view;
};
