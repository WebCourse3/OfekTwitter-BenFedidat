function $(query){
    var queryResult = [];
    var initial = true;
    query.split(" ").forEach(queryField => {
            if(initial) {
                queryResult = document.querySelectorAll(queryField);
            }
            else {
                queryResult = queryResult.querySelectorAll(queryField);
            }
        });
}