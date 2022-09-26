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
  bool isProcessing = false;
  bool hasImgProcessed = false;

  void handleImageUpload() async {
    if (isProcessing) return;

    XFile? file = await _picker.pickImage(source: ImageSource.gallery);

    if (file != null) {
      setState(() {
        _imgFile = file;
        hasImgProcessed = false;
      });
    } else {
      debugPrint("No Image found!");
    }
  }

  processImage() {
    debugPrint("Processed...");

    // Set Loading to true
    // Process
    // Set new image and Text
    // Loading to false
    // set state hasImgProcessed = true
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Team Vision"),
      ),
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _imgFile != null
                  ? Container(
                      padding: const EdgeInsets.all(8),
                      child: Image.file(File(_imgFile!.path)),
                    )
                  : const Text("Select Image"),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                child: Opacity(
                  opacity: (isProcessing || hasImgProcessed) ? 0.75 : 1,
                  child: TextButton(
                    onPressed: isProcessing
                        ? null
                        : _imgFile != null
                            ? processImage
                            : null,
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
                ),
              )
            ],
          ),
        ),
      ),
      floatingActionButton: Opacity(
        opacity: isProcessing ? 0.8 : 1,
        child: FloatingActionButton(
          onPressed: isProcessing ? null : handleImageUpload,
          child: const Icon(Icons.camera_alt),
        ),
      ),
    );
  }
}
