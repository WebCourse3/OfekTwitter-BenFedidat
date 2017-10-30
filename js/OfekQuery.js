(function(){
        
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
            return this.elements.map(element => fn(element));
        },
        any: function(fn) {
            return this.elements.some(element => fn(element));
        },
        all: function(fn) {
            return this.elements.every(element => fn(element));
        },
        filter: function(fn) {
            return this.elements.filter(element => fn(element));
        },
        css: function(property, value) {
            return this.elements.forEach(element => element.setAttribute("style", property + ":" + value + ";" + element.getAttribute("style")));
        },
        count: function() {
            return this.elements.length;
        },
        appendChild: function(childElement) {
            return this.elements.forEach(element => element.appendChild(childElement));
        },
        getAttribute: function(attributeName) {
            return this.elements.map(element => element.getAttribute(attributeName));
        },
        setAttribute: function(attributeName, attributeValue) {
            return this.elements.map(element => element.setAttribute(attributeName, attributeValue));
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
        var queryResult = [document];
        var initial = true;
        query.split(" ").forEach(queryField => {
                queryResult = OfekQuery.filterElements(OfekQuery.getChildrenOfElements(queryResult), queryField);
            });
        this.elements = queryResult;
        return this;
    }

    $ = function(query) {
        return new OfekQuery(query);
    }

    test_group("OfekQuery selector", function() {
        assert($(".dummyClass").elements.length === 2, "class selector");
        assert($("#dummyId").elements.length === 1, "id selector");
        assert($("head").elements.length === 1, "head selector");
        assert($("p .dummyClass").elements.length === 1, "combined element+class selector");
        assert($("a b c").elements.length === 3, "chained a b c selector");
    });

    test_group("OfekQuery class instance methods", function() {
        assert($(".anotherDummy").elements.length === 0, "initial class");
        $(".dummyClass").addClass("anotherDummy");
        assert($(".anotherDummy").elements.length === 2, "added class");
        $(".dummyClass").removeClass("anotherDummy");
        assert($(".anotherDummy").elements.length === 0, "removed class");
    });

    test_group("OfekQuery each/map instance methods", function() {
        assert($(".toremove").elements.length === 2, "divs to remove");
        $(".toremove").each(element => element.remove());
        assert($(".toremove").elements.length === 0, "divs removed after each");
        var newArray = $(".exampleClass").map(element => { return element.innerHTML + " world"; });
        assert(newArray[1] === "My world", "map +world result (string #2)");
        assert($(".exampleClass").any(element => element.innerHTML === "Hello") === true, "any test");
        assert($(".exampleClass").all(element => element.innerHTML === "Hello") === false, "all test");
        assert($(".exampleClass").filter(element => element.innerHTML === "Hello").length === 1, "filter test");
        $(".dummyClass").css("color", "red");
        assert($(".dummyClass").all(element => element.getAttribute("style").includes("red")) === true, "css test");
        assert($(".dummyClass").count() === 2, "count test");
        assert($(".dummyClass").getAttribute("style")[0].includes("red") === true, "getAttribute test");
        $(".dummyClass").setAttribute("style","blue");
        assert($(".dummyClass").all(element => element.getAttribute("style").includes("blue")) === true, "setAttribute test");
        assert($(".dummyClass").elements[0].tagName.toLowerCase() === "div", "get test");
    });
})();