let value = 0, selected_value = 1, transition_time = 1, n = 1, width_container = 405, width_frame = 550
const width_image = 136.7

$(document).ready(function () {
    $("button.right").prop('disabled', true)
});

$("#my_select_count_elements").change(function () {
    const selected_option = $("#my_select_count_elements").val();
    selected_value = selected_option
})

$("#my_select_speed_animation").change(function () {
    const selected_option = $("#my_select_speed_animation").val();
    transition_time = selected_option
})

$("#my_select_count_images_in_container").change(function () {
    const selected_option = $("#my_select_count_images_in_container").val();
    const dom_element_container = $('div.container')
    const dom_element_frame = $('div.frame')
    width_container = 405, width_frame = 550
    if (selected_option == 4) {
        width_container += width_image
        width_frame += width_image
    }
    else if (selected_option == 5) {
        width_container += (width_image * 2)
        width_frame += (width_image * 2)
    }
    dom_element_container.css('width', `${width_container}`)
    dom_element_frame.css('width', `${width_frame}`)
})

$("#button-left").click(nav_slider_click_left);

$("#button-right").click(nav_slider_click_right);

function nav_slider_click_left(e) {
    const { left: element_div_x_left } = $('div.container').position()
    const ul_photos = $('ul.slider-wrapper li')
    const { left: element_ul_x_right } = ul_photos[ul_photos.length - 1].getBoundingClientRect()
    const element_div_x_right = element_div_x_left + (width_container + 2) //407

    if (element_ul_x_right > element_div_x_right) {
        value -= width_image * selected_value
        ul_move(value)
        if (element_ul_x_right - element_div_x_right < 135) {
            $("button.left").prop('disabled', true)
            // setTimeout(ul_move, transition_time * 1000, 0) //if need
        } //open it
    }

    const element = $('button.right');
    if (element.is(':disabled')) {
        element.prop('disabled', false)
    }
}

function nav_slider_click_right(e) {
    const { left: element_ul_x_left } = $('ul.slider-wrapper').position()
    const { left: element_div_x_left } = $('div.container').position()

    if (element_ul_x_left < element_div_x_left) {
        value += width_image * selected_value
        ul_move(value)
        if (element_div_x_left - element_ul_x_left < 140) {
            $("button.right").prop("disabled", true)
        } //open it
    }
    // else {
    //     ul_move(0)
    // } //close it

    const element = $('button.left');
    if (element.is(':disabled')) {
        element.prop('disabled', false)
    } //open it
}

function ul_move(value) {
    const element = $('#ul-slider')
    element.css('transform', `translateX(${value}px)`)
    element.css('transition', `all ${transition_time}s`)
}