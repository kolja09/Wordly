import { DirectiveBinding } from "vue";

interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent: (event: Event) => void;
}

export default {
  beforeMount(el: ClickOutsideElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },

  unmounted(el: ClickOutsideElement) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
