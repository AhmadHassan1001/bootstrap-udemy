const get_courses=async ()=>{
    let response=await fetch("http://localhost:3000/categories");
    let json=await response.json();
    //console.log(json);
    return json;
}

function search(){
    console.log("searching...");
    const search=document.querySelector(".search-input").value;
    if(document.querySelector(".nav-tabs")!=null)
        document.querySelector("main").removeChild(document.querySelector(".nav-tabs"));
    const results_panel=document.querySelector(".tab-content");
    const courses_element=document.createElement("div");
    courses_element.classList.add("py-crses")
    
    while (results_panel.firstChild) {
        results_panel.removeChild(results_panel.lastChild);
    }
    json2.then((json)=>{
        json_orig=json;

        for (let i in json_orig){
            json=json[i]["courses"];
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
            rate_stars.classList.add("img");
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
        

        results_panel.appendChild(courses_element);
    })
}
let width_body=document.body.clientWidth;
let op=5;
if(width_body<=990&&width_body>=500){
    op=3
}else if(width_body<500&&width_body>=100){
    op=2
}else if(width_body<100){
    op=1
}else{
    op=5;
}
let json2=get_courses();
json2.then((json)=>{
    console.log(json);
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
        /** 
        const courses_panel=document.createElement("div");
        courses_panel.classList.add("py-crses");
        courses_panel.classList.add(`${json[cat]["name"]}-courses`);
        panel.appendChild(courses_panel);*/
        const courses_panel=document.createElement("div");
        courses_panel.classList.add("carousel");
        courses_panel.classList.add("slide");
        courses_panel.setAttribute("id",`${json[cat]["name"]}-carousel`);
        courses_panel.setAttribute("data-bs-ride","carousel");

        const inner_carousel=document.createElement("div");
        inner_carousel.classList.add("carousel-inner");

        for(let i=0;i<json[cat]["courses"].length/op;i++){
            const carousel_item=document.createElement("div");
            carousel_item.classList.add("carousel-item");
            if(i==0){
                carousel_item.classList.add("active");
            }

            const flexing=document.createElement("div");
            flexing.classList.add("d-flex");
            flexing.classList.add("flex-row");
            flexing.setAttribute("id",`${json[cat]["name"]}-${i}`);

            carousel_item.appendChild(flexing);

            inner_carousel.appendChild(carousel_item);
        }
        
        courses_panel.appendChild(inner_carousel);
        const carousel_btns=document.createElement("div");
        const prev_btn=document.createElement("button");
        prev_btn.classList.add("carousel-control-prev");
        prev_btn.setAttribute("type","button");
        prev_btn.setAttribute("data-bs-target",`#${json[cat]["name"]}-carousel`);
        prev_btn.setAttribute("data-bs-slide","prev");
        const span_carousel1=document.createElement("span");
        span_carousel1.classList.add("carousel-control-prev-icon");
        span_carousel1.setAttribute("aria-hidden","true");
        prev_btn.appendChild(span_carousel1);
        const span_carousel2=document.createElement("span");
        span_carousel2.classList.add("visually-hidden");
        
        prev_btn.appendChild(span_carousel2);
        carousel_btns.appendChild(prev_btn);

        const next_btn=document.createElement("button");
        next_btn.classList.add("carousel-control-next");
        next_btn.setAttribute("type","button");
        next_btn.setAttribute("data-bs-target",`#${json[cat]["name"]}-carousel`);
        next_btn.setAttribute("data-bs-slide","next");
        const span_carousel1_next=document.createElement("span");
        span_carousel1_next.classList.add("carousel-control-next-icon");
        span_carousel1_next.setAttribute("aria-hidden","true");
        next_btn.appendChild(span_carousel1_next);
        const span_carousel2_next=document.createElement("span");
        span_carousel2.classList.add("visually-hidden");
        
        next_btn.appendChild(span_carousel2_next);
        carousel_btns.appendChild(prev_btn);
        carousel_btns.appendChild(next_btn);
        courses_panel.appendChild(carousel_btns);

        panel.appendChild(courses_panel);

        content.appendChild(panel);

    }
    console.log(json);
    
    for(const cat in json){
        //TODO add courses per category
        
        //console.log(cat);
        for (const course_key in json[cat]["courses"]){
            const courses_element=document.querySelector(`#${json[cat]["name"]}-${Math.floor(course_key/op)}`);
            console.log(`.${json[cat]["name"]}-${Math.floor(course_key/op)}`);
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
            rate_stars.classList.add("img");
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