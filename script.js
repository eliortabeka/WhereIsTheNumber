const $board = document.getElementById('board'),
    $language = document.getElementById('language'),
    numbers = [0,1,2,3,4,5,6,7,8,9],
    $audioTag = document.getElementById('audio'),
    soundsUrls = {
    wrong: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3',
    correct: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3',
    he: {
        where: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_where.mp3',
        0: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_0.mp3',
        1: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_1.mp3',
        2: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_2.mp3',
        3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_3.mp3',
        4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_4.mp3',
        5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_5.mp3',
        6: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_6.mp3',
        7: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_7.mp3',
        8: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_8.mp3',
        9: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_9.mp3'
    },
    en: {
        where: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_where.en.mp3',
        0: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_0.en.mp3',
        1: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_1.en.mp3',
        2: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_2.en.mp3',
        3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_3.en.mp3',
        4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_4.en.mp3',
        5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_5.en.mp3',
        6: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_6.en.mp3',
        7: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_7.en.mp3',
        8: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_8.en.mp3',
        9: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_9.en.mp3'
    }
};

const playSound = (language, sound) => {
    $audioTag.src = soundsUrls[language][sound];
    $audioTag.play();
};
const playSounds = (number) => {
    playSound($language.value, 'where');

    setTimeout(() => {
        playSound($language.value, number);
    }, 1500)
}

const selectedAnswer = ($event) => {

    const isLiElement = $event.target.localName === "li";
    if (!isLiElement) { return false; }

    const currentSelectedAnswer = $event.target.dataset.id;
    const correctAnswer = $board.dataset.answer;

    const isPlayButton = $event.target.dataset.id === 'play-sound';
    if (isPlayButton) {
        return playSounds(correctAnswer);
    }


    if (currentSelectedAnswer === correctAnswer) {
        $board.classList.add('correct');

        $audioTag.src = soundsUrls.correct;
        $audioTag.play();

        setTimeout(() => {
            $board.classList.remove('correct');
            createLevel();
        }, 1300);

    } else {
        $board.classList.add('wrong');

        $audioTag.src = soundsUrls.wrong;
        $audioTag.play();

        setTimeout(() => {
            playSound($language.value, currentSelectedAnswer);
        }, 1100);

        setTimeout(() => {
            $board.classList.remove('wrong');
        }, 1300);
    }
}

const shuffle = (numberArray) => {
    let counter = numberArray.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = numberArray[counter];
        numberArray[counter] = numberArray[index];
        numberArray[index] = temp;
    }
    return numberArray;
}
const createLevel = () => {
    $board.innerHTML = '';
    const random = Math.floor(Math.random() * 10);
    $board.dataset.answer = random;

    playSounds(random);

    const randomNumbers = shuffle(numbers); // return array of shuffled numbers
    randomNumbers.forEach((number) => {
        const liElement = document.createElement('li');
        liElement.innerText = number;
        liElement.dataset.id = number;
        $board.appendChild(liElement);
    });

    const playButton = document.createElement('li');
    playButton.classList.add('play-sound');
    playButton.dataset.id = 'play-sound';
    $board.appendChild(playButton);
}

createLevel();

$board.addEventListener('click', selectedAnswer);
