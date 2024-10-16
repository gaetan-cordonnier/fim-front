import { describe, expect, it } from "@jest/globals";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";
import { mount, shallowMount } from "@vue/test-utils";
import { QBtn } from "quasar";
import MyButton from "./MyButton";

// Configuration de test
installQuasarPlugin();

describe("MyButton", () => {
  it("Vérifie la méthode d'incrémentation", () => {
    const wrapper = mount(MyButton);
    const { vm } = wrapper;

    expect(typeof vm.increment).toBe("function");
  });

  it("Vérification de l'affichage du texte", () => {
    const wrapper = mount(MyButton);
    const { vm } = wrapper;

    expect(vm.$el.textContent).toContain("Texte de vérification");
    expect(wrapper.find(".content").text()).toContain("Texte de vérification");
  });

  it("Vérifie si le type de donnée est correcte", () => {
    const wrapper = mount(MyButton);
    const { vm } = wrapper;

    expect(typeof vm.counter).toBe("number");
    expect(vm.counter).toBe(0);
  });

  it("Vérifie le comportement au moment du click", async () => {
    const wrapper = shallowMount(MyButton);
    const { vm } = wrapper;

    const button = wrapper.findComponent(QBtn);
    await button.trigger("click");
    expect(vm.counter).toBe(1);
  });
});
