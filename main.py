from multiprocessing.dummy import shutdown
from fastapi import FastAPI, UploadFile, File
import uvicorn
from PIL import Image
from keras.models import load_model
from keras.utils import img_to_array
import numpy as np
import shutil
import json

app = FastAPI()
cnn = load_model('cnn_model.h5')


@app.get('/')
async def home_page():
    return {'Message': 'Number Plate Detection API'}


@app.get('/home')
async def model_info():
    return {'Model': 'Number Plate Detection Model', 'Developers': ['Harsh Toshinwal', 'Prathamesh Mutkure', 'Paresh Pandya']}


@app.post('/predict')
async def model_result(file: UploadFile = File(...)):
    filename = file.filename
    extension = filename.split('.')[1]
    if extension not in ['png', 'jpg']:
        return {'status': 'error', 'detail': 'file extension not allowed'}
    with open('./image/' + filename, 'wb') as f:
        shutil.copyfileobj(file.file, f)

    image = Image.open('./image/' + filename)
    img = image.resize(size=(64, 64))
    img.save('./image/' + filename)
    file.close()

    test_image = img_to_array(img)
    test_image = test_image/255
    test_image = np.expand_dims(test_image, axis=0)
    result = cnn.predict(test_image)
    result = result.ravel()
    result = result.tolist()
    result = json.dumps(result)
    return result
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
