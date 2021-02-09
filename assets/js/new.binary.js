function adjustLine(from, to, line) {

    var fT = from.offsetTop + from.offsetHeight;
    var tT = to.offsetTop;
    var fL = from.offsetLeft + from.offsetWidth / 2;
    var tL = to.offsetLeft + to.offsetWidth / 2;

    var CA = Math.abs(tT - fT);
    var CO = Math.abs(tL - fL);
    var H = Math.sqrt(CA * CA + CO * CO);
    var ANG = 180 / Math.PI * Math.acos(CA / H);

    if (tT > fT) {
        var top = (tT - fT) / 2 + fT;
    } else {
        var top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
        var left = (tL - fL) / 2 + fL;
    } else {
        var left = (fL - tL) / 2 + tL;
    }

    if ((fT < tT && fL < tL) || (tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
        ANG *= -1;
    }
    top -= H / 2;

    line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-transform"] = 'rotate(' + ANG + 'deg)';
    line.style.top = top + 'px';
    line.style.left = left + 'px';
    line.style.height = H + 'px';
}

document.addEventListener("DOMContentLoaded", () => {
    const allRows = [...document.querySelectorAll('.r1,.r2, .r3, .r4, .r5')];
    allRows.forEach(row => {
        const rowBlock = [...row.querySelectorAll('.binary__item')];
        rowBlock.forEach(eachBlock => {
            let rowIndex = allRows.indexOf(row),
                blockIndex = rowBlock.indexOf(eachBlock),
                parentBlockIndex = Math.floor(blockIndex / 2),
                parentRow;
            if (rowIndex > 0) {
                parentRow = [...allRows[rowIndex - 1].querySelectorAll('.binary__item')];
            }
            if (rowIndex > 1) {
                adjustLine(parentRow[parentBlockIndex], eachBlock, eachBlock.querySelector('.binary__item-line'))
                window.addEventListener('resize', () => {
                    adjustLine(parentRow[parentBlockIndex], eachBlock, eachBlock.querySelector('.binary__item-line'))
                });
            }
            if (parentRow && (eachBlock.dataset.status == 'active' || eachBlock.dataset.status == 'invited') || eachBlock.dataset.status == 'me') {

                eachBlock.addEventListener('mouseenter', () => {
                    let tempRowIndex = rowIndex - 1,
                        tempBlockIndex = parentBlockIndex;
                    while (tempRowIndex > 0) {
                        let tempParentRow = [...allRows[tempRowIndex - 1].querySelectorAll('.binary__item')]
                        tempRowIndex -= 1;
                        tempBlockIndex = Math.floor(tempBlockIndex / 2);
                        tempParentRow[tempBlockIndex].classList.add('is-colored');
                    }
                    eachBlock.classList.add('is-colored');
                    if (parentRow[parentBlockIndex]) parentRow[parentBlockIndex].classList.add('is-colored');
                });

                eachBlock.addEventListener('mouseleave', () => {
                    let tempRowIndex = rowIndex - 1,
                        tempBlockIndex = parentBlockIndex;
                    while (tempRowIndex > 0) {
                        let tempParentRow = [...allRows[tempRowIndex - 1].querySelectorAll('.binary__item')]
                        tempRowIndex -= 1;
                        tempBlockIndex = Math.floor(tempBlockIndex / 2);
                        tempParentRow[tempBlockIndex].classList.remove('is-colored');
                    }
                    eachBlock.classList.remove('is-colored');
                    parentRow[parentBlockIndex].classList.remove('is-colored');
                });

            }
        });
    });
});