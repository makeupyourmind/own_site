let value = 0, selected_value = 1, transition_time = 1, n = 1, width_container = 405, width_frame = 550
const width_image = 136.7

window.onload = function () {
    document.querySelector("button.right").disabled = true //open it
}

document
    .getElementById("button-left")
    .addEventListener("click", nav_slider_click_left);
document
    .getElementById("button-right")
    .addEventListener("click", nav_slider_click_right);

function onChangeSelectCountElements() {
    const e = document.getElementById("my_select_count_elements");
    const selected_option = e.options[e.selectedIndex].value;
    selected_value = selected_option
}

function onChangeSelectSpeedAnimation() {
    const e = document.getElementById("my_select_speed_animation");
    const selected_option = e.options[e.selectedIndex].value;
    transition_time = selected_option
}

function onChangeSelectCountImagesInContainer() {
    const e = document.getElementById("my_select_count_images_in_container");
    const selected_option = e.options[e.selectedIndex].value;
    const dom_element_container = document.querySelector('div.container')
    const dom_element_frame = document.querySelector('div.frame')
    width_container = 405, width_frame = 550
    if (selected_option == 4) {
        width_container += width_image
        width_frame += width_image
    }
    else if (selected_option == 5) {
        width_container += (width_image * 2)
        width_frame += (width_image * 2)
    }
    dom_element_container.style.width = `${width_container}px`
    dom_element_frame.style.width = `${width_frame}px`
}

function nav_slider_click_left(e) {
    const { x: element_div_x_left } = document.querySelector('div.container').getBoundingClientRect()
    const ul_photos = document.querySelectorAll('ul.slider-wrapper li')
    const { x: element_ul_x_right } = ul_photos[ul_photos.length - 1].getBoundingClientRect()
    const element_div_x_right = element_div_x_left + (width_container + 2) //407

    if (element_ul_x_right > element_div_x_right) {
        value -= width_image * selected_value
        ul_move(value)
        if (element_ul_x_right - element_div_x_right < 135) {
            document.querySelector("button.left").disabled = true
            // setTimeout(ul_move, transition_time * 1000, 0) //if need
        } //open it
    }
    // else {
    //     ul_move(0)
    // } //close it

    if (document.querySelector("button.right").disabled) {
        document.querySelector("button.right").disabled = !document.querySelector("button.right").disabled
    } //open it
}

function nav_slider_click_right(e) {
    const { x: element_ul_x_left } = document.querySelector('ul.slider-wrapper').getBoundingClientRect()
    const { x: element_div_x_left } = document.querySelector('div.container').getBoundingClientRect()

    if (element_ul_x_left < element_div_x_left) {
        value += width_image * selected_value
        ul_move(value)
        if (element_div_x_left - element_ul_x_left < 140) {
            document.querySelector("button.right").disabled = true
        } //open it
    }
    // else {
    //     ul_move(0)
    // } //close it

    if (document.querySelector("button.left").disabled) {
        document.querySelector("button.left").disabled = !document.querySelector("button.left").disabled
    } //open it
}

function ul_move(value) {
    const element = document.getElementById('ul-slider')
    element.style.transform = `translateX(${value}px)`
    element.style.transition = `all ${transition_time}s`
}

// setInterval( () =>  ul_move() , 2000)