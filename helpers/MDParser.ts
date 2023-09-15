export const findSyntax = (lines: string[]) => {
    lines.forEach(line => {
        const isH1 = line.startsWith('#')
        const isH2 = line.startsWith('##')
        const isH3 = line.startsWith('###')
        const isQuote = line.startsWith('>')
        const isRealH1 = isH1 && !isH2 && !isH3
        const isRealH2 = isH1 && isH2 && !isH3
        const isRealH3 = isH1 && isH2 && isH3
        if (isRealH1) {
            const preparedLine = line.replace('# ', '')
            console.log(`<h1 className='text-2xl font-bold capitalize text-neutral-200'>${preparedLine}</h1>`)
        }
        // console.log(isRealH1, isRealH2, isRealH3)
        console.log(line.split(' '))
    })
}