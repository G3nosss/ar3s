from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Enable console logging
    page.on("console", lambda msg: print(f"Console: {msg.text}"))

    # 1. Load Page
    print("Navigating to home...")
    page.goto("http://localhost:5173/")
    page.screenshot(path="verification/1_landing.png")

    # Verify Landing Page Visible
    expect(page.locator("#landingPage")).to_be_visible()

    # 2. Click Cloud IDE
    print("Clicking Cloud IDE...")
    page.click("#card-ide")

    # Verify IDE Page Visible
    expect(page.locator("#idePage")).to_be_visible()
    expect(page.locator("#landingPage")).not_to_be_visible()
    page.screenshot(path="verification/2_ide.png")

    # 3. Click Home
    print("Clicking Home...")
    page.click("#homeBtn")

    # Verify Landing Page Visible again
    expect(page.locator("#landingPage")).to_be_visible()
    page.screenshot(path="verification/3_back_home.png")

    # 4. Click ESP Flash (expect alert)
    print("Clicking ESP Flash...")
    def handle_dialog(dialog):
        print(f"Dialog message: {dialog.message}")
        dialog.accept()

    page.on("dialog", handle_dialog)
    page.click("#card-esp")

    # 5. Verify Verify Button exists and has listener (indirectly, just check it exists in DOM)
    # Go back to IDE
    page.click("#card-ide")
    expect(page.locator("#verifyBtn")).to_be_visible()

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
