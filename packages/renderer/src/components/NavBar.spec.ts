import { test, expect } from "@playwright/experimental-ct-vue";
import NavBar from "./NavBar.vue";

test("it renders", async ({ mount }) => {
  const component = await mount(NavBar);
  //make sure nav component renders
  await expect(component.locator(".navTitle")).toHaveCount(1);
});
