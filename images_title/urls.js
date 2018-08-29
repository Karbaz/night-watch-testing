var liveDomain  = require("../global").liveDomain
exports.structured_urls = {
    "product_page": {
        "url": `${liveDomain}/p/pine-green-boyfriend-t-shirt-for-women?src=collection`,
        "check": ["BreadcrumbList", "Organization", "Product"],
        "tags":"PRODUCT PAGE"
    },
    "category_page": {
        "url": `${liveDomain}/women-new-arrivals-collection`,
        "check": ["BreadcrumbList", "Organization"],
        "tags":"CATEGORY PAGE"
    },
    "mobile_page": {
        "url": `${liveDomain}/mobile-covers-india`,
        "check": ["BreadcrumbList", "Organization"],
        "tags":"MOBILE PAGE"
    },
    "mobile_brand_page": {
        "url": `${liveDomain}/mobile-covers-india/apple-cases-back-covers`,
        "check": ["BreadcrumbList", "Organization"],
        "tags":"MOBILE BRAND PAGE"
    },
    "all_pages": {
        "url": `${liveDomain}`,
        "tags":"ALL PAGES"
    },
}
