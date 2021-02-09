document.addEventListener("DOMContentLoaded", () => {
    const allRows = [...document.querySelectorAll('.r2, .r3, .r4, .r5')];
    allRows.forEach(row => {
        const rowBlock = [...row.querySelectorAll('.binary__item')];
        rowBlock.forEach(eachBlock => {
            let blockWidth = eachBlock.offsetWidth,
                blockHeight = eachBlock.offsetHeight,
                rowIndex = allRows.indexOf(row),
                blockIndex = rowBlock.indexOf(eachBlock),
                parentBlockIndex = Math.floor(blockIndex / 2);
            if (rowIndex > 0) {
                const parentRow = [...allRows[rowIndex - 1].querySelectorAll('.binary__item')];
                let blockCenterX = eachBlock.querySelector('.binary__item-center').getBoundingClientRect().left,
                    parentBlockCenterX = parentRow[parentBlockIndex].querySelector('.binary__item-center').getBoundingClientRect().left;
                var disX = parentBlockCenterX - blockCenterX;
                var disY = 40;
                var dis = Math.sqrt(disX * disX + disY * disY);
                var theta = Math.atan2(disY, dis);
                theta *= 180 / Math.PI;
                eachBlock.querySelector('.binary__item-line').style.width = dis + 'px';
                if (blockIndex % 2 === 0) {
                    eachBlock.querySelector('.binary__item-line').style.transform = `translate(0, -22px) rotate(-${theta}deg)`;
                } else {
                    eachBlock.querySelector('.binary__item-line').style.transform = `translate(-100%, -22px) rotate(${theta}deg)`;
                }
            }
        });
    });
});