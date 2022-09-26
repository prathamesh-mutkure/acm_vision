import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ImagePicker _picker = ImagePicker();
  XFile? _imgFile;

  void handleImageUpload() async {
    XFile? file = await _picker.pickImage(source: ImageSource.gallery);

    if (file != null) {
      debugPrint(file.path);

      setState(() {
        _imgFile = file;
      });
    } else {
      debugPrint("No Image found!");
    }
  }

  onClickHandler() {
    debugPrint("Processed...");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Team Vision"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            _imgFile != null
                ? Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    child: Image.file(File(_imgFile!.path)),
                  )
                : const Text("Select Image"),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              child: TextButton(
                onPressed: _imgFile != null ? onClickHandler : null,
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(
                    Colors.blueAccent,
                  ),
                ),
                child: const Text(
                  "PROCESS",
                  style: TextStyle(color: Colors.white),
                ),
              ),
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: handleImageUpload,
        child: const Icon(Icons.camera_alt),
      ),
    );
  }
}
