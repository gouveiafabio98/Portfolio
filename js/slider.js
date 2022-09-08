var animation = null;
var container = document.querySelector("header .slider");
var elements = container.children;
var margin = parseFloat(window.getComputedStyle(container, null).getPropertyValue('font-size')) * 3;

window.onload = function() {
    container.width = container.clientWidth;

    Array.from(elements).forEach((element, index, array) => {
        element.width = element.clientWidth;
        element.left = 0;
        console.log(element.width);
        if (index > 0) {
            element.left += array[index - 1].width + array[index - 1].left + margin;
        }

        element.style.left = element.left + "px";
    });

    animation = setInterval(slider, 5);

    container.addEventListener("mouseenter", function() { clearInterval(animation); });
    container.addEventListener("mouseleave", function() { animation = setInterval(slider, 5); });
}

function slider() {
    Array.from(elements).forEach((element, index, array) => {
        if (element.left + element.width > 0) {
            element.left -= 0.2;
        } else {
            if (index > 0) {
                if (array[index - 1].left > container.width - array[index - 1].width) {
                    element.left = array[index - 1].left + array[index - 1].width + margin;
                } else {
                    element.left = container.width;
                }
            } else {
                if (array[array.length - 1].left > container.width - array[array.length - 1].width) {
                    element.left = array[array.length - 1].left + array[array.length - 1].width + margin;
                } else {
                    element.left = container.width;
                }
            }
        }
        element.style.left = element.left + "px";
    });
}