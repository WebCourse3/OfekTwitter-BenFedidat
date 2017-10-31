OfekQuery.prototype = {
    addClass: function (class_name) {
        this.elements.forEach(element => element.classList.add(class_name));
    },
    removeClass: function (class_name) {
        this.elements.forEach(element => element.classList.remove(class_name));
    },
    each: function (fn) {
        this.elements.forEach(element => fn(element));
    },
    map: function (fn) {
        var clonedElements = [];
        this.elements.forEach(element => { 
            var clonedElement = element.cloneNode(); 
            clonedElement.innerHTML = element.innerHTML;
            clonedElements.push(clonedElement);
        });
        return clonedElements.map(element => fn(element));
    },
    any: function (fn) {
        return this.elements.some(element => fn(element));
    },
    all: function (fn) {
        return this.elements.every(element => fn(element));
    },
    filter: function (fn) {
        var newQuery = new OfekQuery();
        newQuery.elements = this.elements.filter(element => fn(element));
        return newQuery;
    },
    css: function (property, value) {
        this.elements.forEach(element => element.setAttribute("style", property + ":" + value + ";" + element.getAttribute("style")));
    },
    count: function () {
        return this.elements.length;
    },
    appendChild: function (childElement) {
        this.elements.forEach(element => element.appendChild(childElement));
    },
    getAttribute: function (attributeName) {
        return this.elements.map(element => element.getAttribute(attributeName));
    },
    setAttribute: function (attributeName, attributeValue) {
        this.elements.map(element => element.setAttribute(attributeName, attributeValue));
    },
    get: function (index) {
        return this.elements[index];
    }
}

OfekQuery.getChildrenOfElements = function (elementArray) {
    var allChildren = [];
    elementArray.forEach(element => {
        Array.from(element.getElementsByTagName("*")).forEach(child => {
            allChildren.push(child)
        })
    });
    return allChildren;
}

OfekQuery.filterElements = function (originalContainer, filter) {
    return originalContainer.filter(element => {
        switch (filter[0]) {
            case '.':
                return element.classList.contains(filter.substr(1));
                break;
            case '#':
                return element.id.includes(filter.substr(1));
                break;
            default:
                return element.tagName.toLowerCase() === filter;
        }
    });
}

function OfekQuery(query) {
    if (!query)
        return;
    this.elements = [document];
    query.split(" ").forEach(queryField => {
        this.elements = OfekQuery.filterElements(OfekQuery.getChildrenOfElements(this.elements), queryField);
    });
    return this;
}

$ = function (query) {
    return new OfekQuery(query);
}