
$(document).ready(() => {
    
    function initCanvas(id) {

        return new fabric.Canvas(id, {
            width: 500,
            height: 500
        });

    }

    const canvas = initCanvas('canvas');

    let listItem;
    let listItemImage;
    async function getMemes() {
        let response = await fetch('https://api.imgflip.com/get_memes');

        let data = await response.json();
        console.log(data);

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

    getMemes();

    function setBackground(url, canvas) {

        return fabric.Image.fromURL(url, (img) => {
            canvas.setBackgroundImage(img, canvas.requestRenderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height
            }); 
        }, {crossOrigin: 'Anonymous' });
    };

    $(document).on('click', '.meme-image', function(e) {
        console.log('clicked');
        setBackground($(this).attr('src'), canvas);
        console.log($(e.target));
    });

    function setColorListener() {
        const picker = document.getElementById('colorPicker');
        picker.addEventListener('change', (e) => {
            color = `#${e.target.value}`;
        });
    }
    
    setColorListener();

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
    document.getElementById('save-image').addEventListener("click", function(e) {
        var canvas = document.querySelector('#canvas');

        var dataURL = canvas.toDataURL("image/png", 1.0);

        downloadImage(dataURL, 'my-canvas.jpeg');
    });

    // Save | Download image
    function downloadImage(data, filename = 'untitled.jpeg') {
        var a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
    }

});

