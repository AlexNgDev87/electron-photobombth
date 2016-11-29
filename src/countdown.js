
function setCount(counter, count) {
    counter.innerHTML = count > 0 ? count : ''
}

exports.start = (counter, startFrom, done) => {
    for (let i = 0; i <= startFrom; ++i) {
        setTimeout(_ => {
            console.info('i', i)

            const count = startFrom - i
            setCount(counter, count)
            if (i === startFrom) {
                done()
            }
        }, i * 1000)
    }
}