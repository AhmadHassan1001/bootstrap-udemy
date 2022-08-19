const get_courses=async ()=>{
    let response=await fetch("http://localhost:3000/categories");
    let json=await response.json();
    //console.log(json);
    return json;
}

function search(){
    const search=document.querySelector(".search-input").value;
    const courses_element=document.querySelector(".py-crses");
    
    while (courses_element.firstChild) {
        courses_element.removeChild(courses_element.lastChild);
    }
    json2.then((json)=>{
        json=json[0]["courses"]
        const courses_element=document.querySelector(".py-crses");
        for (const course_key in json){
            const course=json[course_key];
            if(!(course["title"].toLowerCase().includes(search.toLowerCase())))continue;
            //console.log(course);
            const newcourse_element=document.createElement("div");
            newcourse_element.classList.add("py-crs");
    
            const cover=document.createElement("img");
            cover.classList.add("crs-img");
            cover.setAttribute("src",course["cover-image"]);
            newcourse_element.appendChild(cover);
    
            const title=document.createElement("h3");
            title.classList.add("crs-name");
            title.textContent=course["title"];
    
    
            newcourse_element.appendChild(title);
    
            const instructor=document.createElement("h6");
            instructor.textContent=course["instructor"]
    
            newcourse_element.appendChild(instructor);
            
            const rate=document.createElement("div");
            rate.classList.add("rate");
            const rate_label=document.createElement("label");
            rate_label.textContent=course["rate"];
            rate.appendChild(rate_label);
            const rate_stars=document.createElement("img");
            rate_stars.setAttribute("src","images/4_5_StarRating.png");
            rate.appendChild(rate_stars);
    
            newcourse_element.appendChild(rate);
    
            const price=document.createElement("h4");
            price.textContent="E£"+course["price"];
            
            const old_price=document.createElement("strike");
            old_price.textContent="E£"+course["old-price"];
            price.appendChild(old_price);
    
            newcourse_element.appendChild(price);
            courses_element.appendChild(newcourse_element);
    
        }
    })
}

let json2=get_courses();
json2.then((json)=>{
    for(const cat in json){
        //TODO add tabs per category
        const tabs_element=document.querySelector("#myTab");
        const course_tab=document.createElement("li");
        course_tab.classList.add("nav-item");
        course_tab.setAttribute("role","presentation");

        const tab_button=document.createElement("button");
        tab_button.classList.add("nav-link");
        tab_button.classList.add("text-black");
        tab_button.classList.add("fw-bold");
        tab_button.classList.add("border-0");
        if(cat==0){
            tab_button.classList.add("active");
        }
        tab_button.textContent=json[cat]["name"];
        tab_button.setAttribute("id",`${json[cat]["name"]}-tab`);
        tab_button.setAttribute("data-bs-toggle",`tab`);
        tab_button.setAttribute("data-bs-target",`#${json[cat]["name"]}-tab-pane`);
        tab_button.setAttribute("type",`button`);
        tab_button.setAttribute("role",`tab`);
        tab_button.setAttribute("aria-controls",`excel-tab-pane"`);
        tab_button.setAttribute("aria-selected",`true`);
        

        course_tab.appendChild(tab_button);
        tabs_element.appendChild(course_tab);


        //TODO add courses-panel per category
        const content=document.querySelector("#myTabContent");
        const panel=document.createElement("div");
        panel.classList.add("tab-pane");
        panel.classList.add("fade");
        if(cat==0){
            panel.classList.add("show");
            panel.classList.add("active");
        }
        panel.classList.add("tab-crs");
        panel.setAttribute("id",`${json[cat]["name"]}-tab-pane`);
        panel.setAttribute("role","tabpanel");
        panel.setAttribute("aria-labelledby",`${json[cat]["name"]}-tab`)
        panel.setAttribute("tabindex",cat);

        const course_header=document.createElement("h2");
        course_header.textContent=`Expand your career opportunities with ${json[cat]["name"]}`;
        panel.appendChild(course_header);

        const course_breif=document.createElement("p");
        course_breif.classList.add("brief-crs");
        course_breif.textContent=json[cat]["brief"];
        panel.appendChild(course_breif);

        const explore_button=document.createElement("button");
        explore_button.classList.add("exp");
        explore_button.classList.add("nav-btn");
        explore_button.textContent=`Explore ${json[cat]["name"]}`
        panel.appendChild(explore_button);

        const courses_panel=document.createElement("div");
        courses_panel.classList.add("py-crses");
        courses_panel.classList.add(`${json[cat]["name"]}-courses`);
        panel.appendChild(courses_panel);


        content.appendChild(panel);

    }
    console.log(json);
    
    for(const cat in json){
        //TODO add courses per category
        
        //console.log(cat);
        const courses_element=document.querySelector(`.${json[cat]["name"]}-courses`);
        for (const course_key in json[cat]["courses"]){
            const course=json[cat]["courses"][course_key];
            //console.log(course);
            //console.log(course);
            const newcourse_element=document.createElement("div");
            newcourse_element.classList.add("py-crs");

            const cover=document.createElement("img");
            cover.classList.add("crs-img");
            cover.setAttribute("src",course["cover-image"]);
            newcourse_element.appendChild(cover);

            const title=document.createElement("h3");
            title.classList.add("crs-name");
            title.textContent=course["title"];


            newcourse_element.appendChild(title);

            const instructor=document.createElement("h6");
            instructor.textContent=course["instructor"]

            newcourse_element.appendChild(instructor);
            
            const rate=document.createElement("div");
            rate.classList.add("rate");
            const rate_label=document.createElement("label");
            rate_label.textContent=course["rate"];
            rate.appendChild(rate_label);
            const rate_stars=document.createElement("img");
            rate_stars.setAttribute("src","images/4_5_StarRating.png");
            rate.appendChild(rate_stars);

            newcourse_element.appendChild(rate);

            const price=document.createElement("h4");
            price.textContent="E£"+course["price"];
            
            const old_price=document.createElement("strike");
            old_price.textContent="E£"+course["old-price"];
            price.appendChild(old_price);

            newcourse_element.appendChild(price);
            courses_element.appendChild(newcourse_element);

        }
    }
    
})