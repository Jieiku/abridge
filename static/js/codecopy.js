const changeIcon = (copyDiv, className) => {
    copyDiv.classList.add(className);
    setTimeout(() => copyDiv.classList.remove(className), 2500);
};

const copyCodeAndChangeIcon = async (copyDiv, block) => {
    const code = getCodeContent(block);
    try {
        await navigator.clipboard.writeText(code);
        changeIcon(copyDiv, "yes");
    } catch (error) {
        changeIcon(copyDiv, "err");
    }
};

const getCodeContent = (block) => {
    return [...block.querySelectorAll('.giallo-l')]
        .map(line => {
            const clone = line.cloneNode(true);
            const ln = clone.querySelector('.giallo-ln');
            if (ln) ln.remove();
            return clone.textContent;
        })
        .join('\n');
};

document.querySelectorAll("pre").forEach((block) => {
    const copyDiv = document.createElement("div");
    copyDiv.className = "cc svgs svgh copy";
    copyDiv.innerHTML = " ";
    block.prepend(copyDiv);
    copyDiv.addEventListener("click", () => copyCodeAndChangeIcon(copyDiv, block));
});
