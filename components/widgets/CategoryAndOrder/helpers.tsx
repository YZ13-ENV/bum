export const detectCategoryTab = (segment: string, sortTab: string) => {
    if (segment.includes(sortTab)) return sortTab
    if (segment.includes(`${sortTab}/animation`)) return `${sortTab}/animation`
    if (segment.includes(`${sortTab}/illustration`)) return `${sortTab}/illustration`
    if (segment.includes(`${sortTab}/typography`)) return `${sortTab}/typography`
    if (segment.includes(`${sortTab}/product_design`)) return `${sortTab}/product_design`
    if (segment.includes(`${sortTab}/web`)) return `${sortTab}/web`
    if (segment.includes(`${sortTab}/mobile`)) return `${sortTab}/mobile`
    return null
}
export const detectSortTab = (segment: string): '/recommendations' | '/popular' | '/following' | '/new' | null => {
    if (segment.includes('/recommendations')) return '/recommendations'
    if (segment.includes('/popular')) return '/popular'
    if (segment.includes('/following')) return '/following'
    if (segment.includes('/new')) return '/new'
    return null
}
export const replaceSortTabTo = (segment: string, toReplace: string) => {
    if (segment.includes('/recommendations')) return segment.replace('/recommendations', toReplace)
    if (segment.includes('/popular')) return segment.replace('/popular', toReplace)
    if (segment.includes('/following')) return segment.replace('/following', toReplace)
    if (segment.includes('/new')) return segment.replace('/new', toReplace)
    return segment
}
export const replaceCategoryTabTo = (segment: string, sortTab: string, toReplace: string) => {
    if (segment.includes(sortTab)) return segment.replace(sortTab, toReplace)
    if (segment.includes(`${sortTab}/animation`)) return segment.replace(`${sortTab}/animation`, toReplace)
    if (segment.includes(`${sortTab}/illustration`)) return segment.replace(`${sortTab}/illustration`, toReplace)
    if (segment.includes(`${sortTab}/typography`)) return segment.replace(`${sortTab}/typography`, toReplace)
    if (segment.includes(`${sortTab}/product_design`)) return segment.replace(`${sortTab}/product_design`, toReplace)
    if (segment.includes(`${sortTab}/web`)) return segment.replace(`${sortTab}/web`, toReplace)
    if (segment.includes(`${sortTab}/mobile`)) return segment.replace(`${sortTab}/mobile`, toReplace)
    return segment
}