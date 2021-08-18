document.querySelectorAll('.input').forEach(inputElement => {
    const dropZoneElement=inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener('click',e=>{
        inputElement.click();
    });

    dropZoneElement.addEventListener('change',e=>{
        if(inputElement.files.length)
        {
            updateThumbnail(dropZoneElement,inputElement.files[0]);
        }
    });

    dropZoneElement.addEventListener('dragover',(e)=>{
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone__over");
    });

    ['dragleave','dragend'].forEach(type=>{
        dropZoneElement.addEventListener(type,(e)=>{
            e.preventDefault();
            dropZoneElement.classList.remove("drop-zone__over");
        })
    })

    dropZoneElement.addEventListener('drop',(e)=>{
        e.preventDefault();
        if(e.dataTransfer.files.length)
        {
            inputElement.files=e.dataTransfer.files;
            updateThumbnail(dropZoneElement,e.dataTransfer.files[0]);
        }
        dropZoneElement.classList.remove("drop-zone__over");
    });
});

function updateThumbnail(dropZoneElement,file)
{
    let thumbnailElement=dropZoneElement.querySelector(".thumb");


    //for the first time, promp will be present.
    if(dropZoneElement.querySelector(".prompt"))
    {
        dropZoneElement.querySelector(".prompt").remove();
    }

    //for the first time, thumbnailElement will be empty
    if(!thumbnailElement)
    {
        thumbnailElement=document.createElement("div");
        thumbnailElement.classList.add("thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }
    
    thumbnailElement.dataset.label=file.name;

    if(file.type.startsWith("image/"))
    {
        const reader=new FileReader();
        reader.readAsDataURL(file);

        reader.onload=()=>{
            thumbnailElement.style.backgroundImage=`url(${reader.result})`;
        }
    }
    else{
        thumbnailElement.style.backgroundImage="";
    }
} 