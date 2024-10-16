<template>
  <div ref="otpCont">
    <input
      type="number"
      class="digit-box"
      v-for="(el, ind) in digits"
      :key="el + ind"
      v-model="digits[ind]"
      :autofocus="ind === 0"
      maxlength="1"
      @keydown="handleKeyDown($event, ind)"
      :class="{ bounce: digits[ind] !== null }"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true,
  },
});

const digits = reactive([]);

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null;
  }
}

const otpCont = ref(null);

const emit = defineEmits(["update:otp"]);

function handleKeyDown(event, index) {
  if (
    event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = null;

    if (index != 0) {
      otpCont.value.children[index - 1].focus();
    }

    //
    emit("update:otp", digits.join(""));
  }

  if (new RegExp("^([0-9])$").test(event.key)) {
    digits[index] = event.key;

    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus();
    }

    emit("update:otp", digits.join(""));
  }
}
</script>

<style lang="scss" scoped>
.digit-box {
  height: 4rem;
  width: 2rem;
  border: 2px solid transparent;
  display: inline-block;
  border-radius: 5px;
  margin: 5px;
  padding-left: 3px;
  font-size: 2.5rem;
  color: $grey-9;
  background-color: rgba(0, 0, 0, 0.1);
}
.digit-box:focus {
  outline: 2px solid $primary;
}

.bounce {
  animation: pulse 0.3s ease-in-out alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}
</style>
