const changeIcon = (copyDiv, className) => {
    copyDiv.classList.add(className);
    setTimeout(() => copyDiv.classList.remove(className), 2500);
};

const copyCodeAndChangeIcon = async (copyDiv, block) => {
    const code = block.querySelector('table') ? getTableCode(block) : getNonTableCode(block);
    try {
        await navigator.clipboard.writeText(code);
        changeIcon(copyDiv, "yes");
    } catch (error) {
        changeIcon(copyDiv, "err");
    }
};

const getNonTableCode = (block) => {
    return [...block.querySelectorAll('code')]
        .map(code => code.textContent)
        .join('');
};

const getTableCode = (block) => {
    return [...block.querySelectorAll('tr')]
        .map(row => row.querySelector('td:last-child')?.innerText ?? '')
        .join('');
};

document.querySelectorAll("pre").forEach((block) => {
    const copyDiv = document.createElement("div");
    copyDiv.className = "cc svgs svgh copy";
    copyDiv.innerHTML = " ";
    block.prepend(copyDiv);
    copyDiv.addEventListener("click", () => copyCodeAndChangeIcon(copyDiv, block));;
});
