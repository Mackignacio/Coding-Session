import 'package:flutter/material.dart';
import 'package:flutter_todo/todo.model.dart';
import 'package:flutter_todo/todo.service.dart';
import 'package:fluttertoast/fluttertoast.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Todo list app',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Todo List App'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  bool checkBox = false;
  final titleController = TextEditingController();
  final TodoService todoService = TodoService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: _futureBuilder(),
      floatingActionButton: _floatingActionButton(),
    );
  }

  Widget _futureBuilder() {
    return FutureBuilder(
      future: todoService.getAll(),
      builder: (BuildContext context, AsyncSnapshot<List<TodoModel>> snapshot) {
        if (snapshot.hasData) {
          return _body(snapshot.data);
        }

        return Container();
      },
    );
  }

  Widget _body(List<TodoModel> todos) {
    return ListView.builder(
      itemCount: todos.length,
      itemBuilder: (BuildContext context, int index) {
        return _itemBuilder(todos[index]);
      },
    );
  }

  Widget _itemBuilder(TodoModel todo) {
    return Container(
      height: 50,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Row(
            children: <Widget>[
              _checkBox(todo.completed),
              _itemText(todo.title),
            ],
          ),
          Row(
            children: _buttons(todo),
          )
        ],
      ),
    );
  }

  List<Widget> _buttons(TodoModel todo) {
    return <Widget>[
      _buttonBuilder(
        icon: Icons.edit,
        color: Colors.green,
        onTap: () {
          _addItemDialog(true, todo);
        },
      ),
      _buttonBuilder(
        icon: Icons.delete,
        color: Colors.red,
        onTap: () {
          setState(() {
            todoService.delete(todo).then((value) {
              _toastBuilder(value);
            });
          });
        },
      )
    ];
  }

  Widget _buttonBuilder({IconData icon, Color color, void Function() onTap}) {
    return GestureDetector(
      child: Icon(
        icon,
        color: color,
      ),
      onTap: onTap,
    );
  }

  Widget _checkBox(bool completed) {
    return Checkbox(
      value: completed,
      onChanged: (bool value) {
        print(value);
      },
    );
  }

  Widget _itemText(String value) {
    return Text(value);
  }

  Widget _floatingActionButton() {
    return FloatingActionButton(
      onPressed: () {
        _addItemDialog(false, null);
      },
      tooltip: 'Adding',
      child: Icon(Icons.add),
    );
  }

  Future<void> _addItemDialog(bool isEditing, TodoModel todo) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) => _alertDialog(isEditing, todo),
    );
  }

  Widget _alertDialog(bool isEditing, TodoModel todo) {
    String title = isEditing ? 'Update TODO' : 'Add TODO';
    return AlertDialog(
      title: Text(title),
      content: _alertDialogContent(),
      actions: _alertDialogActions(isEditing, todo),
    );
  }

  List<Widget> _alertDialogActions(bool isEditing, TodoModel todo) {
    TodoModel item = todo != null
        ? todo
        : TodoModel(
            title: titleController.text,
            completed: false,
          );

    if (isEditing) {
      titleController.text = todo.title;
    }

    Widget button = isEditing
        ? _actionButton(
            "Update",
            addItem: null,
            updateItem: () => TodoModel(
              title: titleController.text,
              completed: todo.completed,
              id: todo.id,
            ),
            todo: todo,
          )
        : _actionButton("Add", addItem: _addItem, todo: item);

    return <Widget>[_actionButton("Cancel"), button];
  }

  Widget _actionButton(String title,
      {Function addItem, Function updateItem, TodoModel todo}) {
    return FlatButton(
      child: Text(title),
      onPressed: () {
        setState(() {
          if (addItem != null) {
            addItem(todo);
          }

          if (updateItem != null) {
            _updateItem(updateItem());
          }
        });

        titleController.text = "";
        Navigator.of(context).pop();
      },
    );
  }

  Widget _alertDialogContent() {
    return SingleChildScrollView(
      child: TextField(
        controller: titleController,
        decoration: InputDecoration(
          border: InputBorder.none,
          hintText: 'Enter TODO here...',
        ),
      ),
    );
  }

  _addItem(TodoModel todo) {
    todoService.post(todo).then((value) {
      titleController.text = "";
      _toastBuilder(value);
    });
  }

  _updateItem(TodoModel todo) {
    todoService.patch(todo).then((value) {
      titleController.text = "";
      _toastBuilder(value);
    });
  }

  Future<bool> _toastBuilder(String message) {
    return Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.CENTER,
      timeInSecForIosWeb: 1,
      backgroundColor: Colors.red,
      textColor: Colors.white,
      fontSize: 16.0,
    );
  }
}
