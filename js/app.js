var hits = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

var Player = 1;

$(document).ready( function() {
    
    $('#btn-restart').on('click', function(e) {
        e.preventDefault();
        restartGame();
    });
    for(i=1; i<=9; i++) {

        let btnIdVal = `#btn-${i}`;
        let index = i;
        $(btnIdVal).on('click', function(e) {
            e.preventDefault();
            updateGridColor(btnIdVal);
            updateStaticGrid(index);
            var match_ended = checkResult();
            if(match_ended == false)
                togglePlayer();
        });
    }
});

function togglePlayer() {
    if(Player == 1) Player = 2;
    else Player = 1;
}

function updateGridColor(btnId) {

    if(Player == 1) { displayPlayedColor(1, btnId); } 
    else { displayPlayedColor(2, btnId); }
}

function displayPlayedColor(color, btnId) {

    if(color == 1) {
        $(btnId).addClass(` clicked p${color}`);
        const buttonElmnt = document.querySelector(btnId);
        buttonElmnt.innerHTML = `<i class="fa fa-check fa-4x" aria-hidden="true"></i>`;
    }
    else {
        $(btnId).addClass(` clicked p${color}`);
        const buttonElmnt = document.querySelector(btnId);
        buttonElmnt.innerHTML = `<i class="fa fa-times fa-4x" aria-hidden="false"></i>`;
    }
    
    $(btnId).prop('disabled', true);
}

function updateStaticGrid(gridIndex) {

    let col = gridIndex;
    if(col%3 == 0) col = 2;
    else col = gridIndex%3 - 1;

    let row = Math.ceil(gridIndex/3) - 1;
    
    hits[row][col] = Player;
}

function checkResult() {
    // console.log(hits);
    let zeros_cnt = 9;
    for(i=0; i<3; i++) for(j=0; j<3; j++) if(hits[i][j] == 0) zeros_cnt -= 1;
    // console.log('zeros - ' + zeros_cnt);

    if(any_win_state_exists() == 1) {

        alert('Player - ' + Player + ' wins the game. Congratulations. Play again..');
        restartGame();
        return true;
    } 
    else {
        
        if(zeros_cnt == 9) {
            alert('Match Drawn. Try again...');
            restartGame();
            return true;
        }
    }
    return false;
}

function any_win_state_exists() {

    let match_found = 0;

    for(i=0; i<3; i++)
    {
        for(j=0; j<3; j++)
        {   
            if(hits[i][j] == Player)
            {
                // console.log('Player - ' + Player);
                // console.log('Before --- i - ' + i + ', j - ' + j + ', match_found - ' + match_found);
                match_found |= check_match_found(i, j, -1, -1, 1, 1);
                match_found |= check_match_found(i, j, -1, 0, 1, 0);
                match_found |= check_match_found(i, j, -1, 1, 1, -1);
                match_found |= check_match_found(i, j, 0, -1, 0, 1);
                // console.log('After ------- i - ' + i + ', j - ' + j + ', match_found - ' + match_found);
            }
        }
    }
    return match_found;
}

function check_match_found(i, j, xu, yu, xd, yd) {

    let dx_left_up = i + xu;
    let dy_left_up = j + yu;
    let dx_right_down = i + xd;
    let dy_right_down = j + yd;

    // console.log('dx_left_up = ' + dx_left_up + ', dy_left_up = ' + dy_left_up + ', dx_right_down = ' + dx_right_down + ', dy_right_down = ' + dy_right_down);

    if(dx_left_up >= 0 && dx_left_up < 3
        && dy_left_up >= 0 && dy_left_up < 3
        && dx_right_down >= 0 && dx_right_down < 3
        && dy_right_down >= 0 && dy_right_down < 3)
    {
        if(hits[dx_left_up][dy_left_up] == Player && hits[dx_right_down][dy_right_down] == Player) {
                // console.log('Enter');
            return 1;
        }
    }
    return 0;
}

function restartGame() {
    
    Player = 1;

    for(i=1; i<=9; i++) {

        let btnIdVal = `#btn-${i}`;
        $(btnIdVal).prop('disabled', false);
        $(btnIdVal).removeClass();
        $(btnIdVal).addClass(`btn btn-default btn-square`);
        const buttonElmnt = document.querySelector(btnIdVal);
        buttonElmnt.innerHTML = ``;
    }

    for(i=0; i<3; i++) for(j=0; j<3; j++) hits[i][j] = 0;

}

