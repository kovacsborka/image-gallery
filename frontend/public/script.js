async function parseJSON(url) {
    const response = await fetch(url);
    return response.json();
}


const swiperComponent = (data, comp) => {
    return `
        <div class="swiper">
            <div class="swiper-wrapper">
                ${data.map(img => comp(img)).join("")}
            </div>
        </div>
    `
}

const swiperSlideComponent = ({filename, title}) => {
    return `
        <div class="swiper-slide">
            <h2>${title}</h2>
            <img src="/pub/images/${filename}">
            <button>Delete</button>
        </div>
        `;
}

const formComponent = () => {
    return `
        <form action="" id="form">
            <input type="file" name="image">
            <input type="text" placeholder="Title" name="title">
            <input type="text" placeholder="Photographer" name="photographer">
            <button>Submit</button>
        </form>
        `;
}

const loadEvent = async () => {
    console.log("loaded");

    const rootElement = document.getElementById("root")
    const result = await parseJSON("/image-list")

    rootElement.insertAdjacentHTML("beforeend", swiperComponent(result, swiperSlideComponent), )

    rootElement.insertAdjacentHTML("beforeend", formComponent())

    const swiper = new Swiper(".swiper", {
        loop: true
    })





    const formElement = document.getElementById("form");
    formElement.addEventListener("submit", e => {
        e.preventDefault();
       /*  console.dir(e); */

        const formData = new FormData() 
        formData.append("title", e.target.querySelector(`input[name="title"]`).value) 
        formData.append("photographer", e.target.querySelector(`input[name="photographer"]`).value) 
        formData.append("filename", e.target.querySelector(`input[name="image"]`).files[0]) 
        


        console.log(formData);

        
        const fetchSettings = {
            method: "POST",
            body: formData
        }

        fetch("/", fetchSettings) 
            .then(async data => {
                if (data.status === 200) {
                    const res = await data.json()
                    // e.target.outerHTML = `<img src="upload/${res.pictureName}">`
                    // console.dir(data);
                }
            })
            .catch(error => {
                e.target.outerHTML = "error";
                console.dir(error)
            })

            
    })


}

window.addEventListener("load", loadEvent)