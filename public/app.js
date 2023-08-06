
$(document).ready(() => {
    let listItem;
    let listItemImage;

    /*----------FUNCTIONS------------*/

    function initCanvas(id) {

        return new fabric.Canvas(id, {
            width: 350,
            height: 350
        });

    }

    async function getMemes() {
        let response = await fetch('https://api.imgflip.com/get_memes');
        let data = await response.json();

        let memeArray = data.data.memes;
        let memeList = document.querySelector('.memes-list');

        for(let i = 0; i < memeArray.length; i++) {
            listItem = document.createElement('li');
            listItemImage = document.createElement('img');
            memeList.append(listItem);
            listItemImage.setAttribute('crossOrigin', 'anonymous');
            listItemImage.setAttribute('src', memeArray[i].url);
            listItemImage.setAttribute('class', 'meme-image');
            listItem.append(listItemImage);
        }
    }

    function setBackground(url, canvas) {

        return fabric.Image.fromURL(url, (img) => {
            canvas.setBackgroundImage(img, canvas.requestRenderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height
            }); 
        }, {crossOrigin: 'Anonymous' });
    };

    function setColorListener() {
        const picker = document.getElementById('colorPicker');
        picker.addEventListener('change', (e) => {
            color = `#${e.target.value}`;
        });
    }

    function downloadImage(data, filename = 'untitled.jpeg') {
        var a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
    }

    function addRectangle() {
        let canvasCenter = canvas.getCenter();
        let rectangle = new fabric.Rect({
            width: 100,
            height: 50,
            fill: '#000000',
            top: canvasCenter.top,
            left: canvasCenter.left,
            originX: 'center', 
            originY: 'center',
            cornerColor: 'black',
        });
        canvas.add(rectangle);
        canvas.requestRenderAll();
    }

    function addCircle() {
        let canvasCenter = canvas.getCenter();
        let circle = new fabric.Circle({
            radius: 50,
            fill: 'rgb(0, 0, 0)',
            top: canvasCenter.top,
            left: canvasCenter.left,
            originX: 'center', 
            originY: 'center',
            cornerColor: 'black',
            cornerStyle: 'circle'
        });
        canvas.add(circle);
        canvas.requestRenderAll();
    }

    function removeObject() {
        let selected = canvas.getActiveObject();
        canvas.remove(selected);
        canvas.requestRenderAll();
    }

    /*-------EVENT LISTENERS-------*/

    $(document).on('click', '.meme-image', function(e) {
        setBackground($(this).attr('src'), canvas);
    });

    $(document).on('click', '.remove', function() {
        removeObject();
    });

    

    $('#add-text').on('click', function() {
        let textObject = new fabric.IText('Enter text here...', {
            fontSize: 32,
            fill: 'rgb(0, 0, 0)',
            left: 65,
            top: 175,
            radius: 100,
            borderRadius: '25px',
            hasRotatingPoint: true
        });
        canvas.add(textObject).setActiveObject(textObject);
        canvas.requestRenderAll();
    });

    $('.selected-objects').on('click', function() {
        console.log(canvas.getActiveObject());
    });

    $('.add-rectangle').on('click', function() {
        addRectangle();
    });

    $('.add-circle').on('click', function() {
        addCircle();
    });

    $('#changeTextColor').on('click', function() {
        console.log($('#colorPicker').text());
        canvas.getActiveObject().set('fill', $('#colorPicker').attr('data-current-color'));
        canvas.requestRenderAll();
    });

    // Convert canvas to image
    $('#save-image').on("click", function(e) {
        var canvas = document.querySelector('#canvas');
        var dataURL = canvas.toDataURL("image/png", 1.0);
        downloadImage(dataURL, 'my-canvas.jpeg');
    });

    /*----------ON LOAD----------*/
    const canvas = initCanvas('canvas');
    getMemes();

});

