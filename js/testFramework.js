currentTestGroupName = "";

function test_group(name, test_group_function) {
    document.body.innerHTML += `
        <div class="container border border-dark my-3">
            <h3>${"Test group: " + name}</h3>
            <table class="tests table table-bordered table-dark testPassed" testGroup="${name}">
                <thead>
                    <th>Test name</th>
                    <th>Test passed?</th>
                </thead>
            </table>
        </div
    `;
    currentTestGroupName = name;
    test_group_function();
}

function assert(value, name) {
    addTestCellToGroup(name, value);
}

function addTestCellToGroup(testName, testPassed) {
    var groupContainer = document.querySelector("[testGroup='" + currentTestGroupName + "']");
    groupContainer.innerHTML += `
        <tr class="${testPassed?"testPassed":"testFailed"}">
            <td>${testName}</td>
            <td>${testPassed}</td>
        </tr>
        `;
    if(!testPassed) {
        groupContainer.classList.remove("testPassed");
        groupContainer.classList.add("testFailed");
    }
    
}