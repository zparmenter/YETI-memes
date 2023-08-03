
$(document).ready(() => {
    let listItem;
    let listItemImage;
    let textObject = new fabric.IText('Enter text here...', {
        fontSize: 32,
        fill: '#FFFFFF',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        left: 65,
        top: 175,
        radius: 100,
        borderRadius: '25px',
        hasRotatingPoint: true
    });


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

    /*-------EVENT LISTENERS-------*/

    $(document).on('click', '.meme-image', function(e) {
        setBackground($(this).attr('src'), canvas);
    });

    

    $('#add-text').on('click', function() {
        let textObject = new fabric.IText('Enter text here...', {
            fontSize: 32,
            fill: '#FFFFFF',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            left: 180,
            top: 225,
            radius: 100,
            borderRadius: '25px',
            hasRotatingPoint: true
        });
        canvas.add(textObject).setActiveObject(textObject);
        canvas.requestRenderAll();
    })

    $('#changeTextColor').on('click', function() {
        console.log($('#colorPicker').text());
        canvas.getActiveObject().set('fill', $('#colorPicker').attr('data-current-color'));
        canvas.requestRenderAll();
    })

    // Convert canvas to image
    $('#save-image').on("click", function(e) {
        var canvas = document.querySelector('#canvas');
        var dataURL = canvas.toDataURL("image/png", 1.0);
        downloadImage(dataURL, 'my-canvas.jpeg');
    });

    /*----------ON LOAD----------*/
    const canvas = initCanvas('canvas');
    getMemes();
    setColorListener();
    canvas.add(textObject).setActiveObject(textObject);

});

