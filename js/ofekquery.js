OfekQuery.prototype = {
    addClass: function(class_name){
        this.elements.forEach(element => element.classList.add(class_name));
    },
    removeClass: function(class_name){
        this.elements.forEach(element => element.classList.remove(class_name));
    },
    each: function(fn) {
        this.elements.forEach(element => fn(element));
    },
    map: function(fn) {
        var clonedElements = [];
        this.elements.forEach(element => clonedElements.push(element.cloneNode));
        return clonedElements.map(element => fn(element));
    },
    any: function(fn) {
        return this.elements.some(element => fn(element));
    },
    all: function(fn) {
        return this.elements.every(element => fn(element));
    },
    filter: function(fn) {
        var newQuery = new OfekQuery();
        newQuery.elements = this.elements.filter(element => fn(element));
        return newQuery;
    },
    css: function(property, value) {
        this.elements.forEach(element => element.setAttribute("style", property + ":" + value + ";" + element.getAttribute("style")));
    },
    count: function() {
        return this.elements.length;
    },
    appendChild: function(childElement) {
        this.elements.forEach(element => element.appendChild(childElement));
    },
    getAttribute: function(attributeName) {
        return this.elements.map(element => element.getAttribute(attributeName));
    },
    setAttribute: function(attributeName, attributeValue) {
        this.elements.map(element => element.setAttribute(attributeName, attributeValue));
    },
    get: function(index) {
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

OfekQuery.filterElements= function(originalContainer, filter) {
    return originalContainer.filter(element => {
        switch(filter[0]) {
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

function OfekQuery(query){
    if(!query)
        return;
    this.elements = [document];
    query.split(" ").forEach(queryField => {
            this.elements = OfekQuery.filterElements(OfekQuery.getChildrenOfElements(this.elements), queryField);
        });
    return this;
}

function match(element, filter) {
    var matching;
    switch(filter[0]) {
        case '.':
            matching = element.classList.contains(filter.substr(1));
            break;
        case '#':
            matching = element.id.includes(filter.substr(1));
            break;
        default:
            matching = element.tagName.toLowerCase() === filter;
    }
    if(matching)
        return element;
}
function OfekQueryRecursive(queryArray, element) {
    if(queryArray.length == 0)
        return elements;
    var matchingChildren = [];
    var nextTerm = queryArray.shift();
    element.childNodes.forEach(element => {
        if(match(element, nextTerm)) {
            matchingChildren.push(OfekQueryRecursive(nextTerm, element));
        }
        else {
            matchingChildren.push(OfekQueryRecursive(queryArray, element));
        }
    });
    return matching;
}
function OfekQueryRecursiveInit(query) {
    if(!query)
        return;
    var element = document.getElementsByClassName("container")[0];
    this.elements = OfekQueryRecursive(query.split(" "), element);
    return this;
}

$ = function(query) {
    return new OfekQuery(query);
}