class English {
    constructor () {
        this.elements = {
            main: document.querySelector('.main'),
            burgerContent: document.querySelector('.burger__content'),
            burger: document.querySelector('.burger'),
            buttonSwitch: document.querySelectorAll('.card__switch'),
            cards: document.querySelectorAll('.card'),
            cardImages: document.querySelectorAll('.card__img'),
            cardName: document.querySelectorAll('.card__name'),
            menuList: document.querySelectorAll('.list__item'),
            table: document.querySelector('.table'),
            tableBody: document.querySelector('.table__body'),
            wrapperLine: document.querySelectorAll('.wrapper__line'),
            switchPick: document.querySelectorAll('.switch__pick'),
            audioElement: new Audio(),
            playGame: document.querySelector('.switch'),
            playText: document.querySelector('.switch__text'),
            playSlider: document.querySelector('.slider'),
            startButton: document.querySelector('.start'),
            score: document.querySelector('.score'),
            endGameText: document.querySelector('.game__text'),
            endGameImg: document.querySelector('.game__img'),
            endPopup: document.querySelector('.popup__game')
        }
        this.elementsCheck = {
            burgerCheck: false,
            switchCheck: false,
            buttonSwitchCheck: false,
            mainPageCheck: false,
            tableCheck: false,
            reverseCheck: false,
        }
        this.mistake = 0
        this.group = 0
        this.arr = []
        this.index = 0
        this.handlerShim = (e) => {this.gameTrueEvent(e)}
    }        

    openBurger () {
        this.elements.burger.classList.toggle('burger__active')
        this.elementsCheck.burgerCheck = !this.elementsCheck.burgerCheck
        if (this.elementsCheck.burgerCheck) {
            this.elements.burgerContent.style.left = '0px'
        } else {
            this.elements.burgerContent.style.left = '-700px'
        }
    }    

    loadCardContent () {
        this.elementsCheck.buttonSwitchCheck = false
        this.elementsCheck.mainPageCheck = true
        for (let i = 0; i < this.elements.cardImages.length; i++) {
            this.elements.cardImages[i].style.background = `center / cover no-repeat url(${cardsList[i+1][0].image})`
            this.elements.cardName[i].innerHTML = cardsList[0][i]
        }
    }

    loadPage() {
        this.elements.main.removeChild(this.elements.main.firstElementChild)
        let wrap = this.elements.main.appendChild(document.createElement('div'))
        wrap.classList.add('wrapper')
        for(let i = 0; i < 2; i++) {
            let wrapLine = wrap.appendChild(document.createElement('div'))
            wrapLine.classList.add('wrapper__line')
            for(let i = 0; i < 4; i++) {
                wrapLine.innerHTML += `<div class="card ${i+1}" id="${i+2}">\n<div class="card__img"></div>\n<div class="card__text">\n<h2 class="card__name"></h2>\n<div class="card__switch visable">\n<img src="img/switch2.png" alt="swith" class="switch__pick" id="${i+1}">\n</div>\n</div>\n</div>\n`
            }
        }
    }
    
    reverse (e) {
        this.elementsCheck.reverseCheck = true
        this.elements.cards.forEach(item => {
            let cont = e.target.id
            this.elements.switchPick[cont - 1].classList.add('visable')
            if (item.classList.contains(cont)) {
                item.style.transform = 'rotateY(180deg)'
                this.elements.cardName[cont - 1].innerHTML = cardsList[this.group][cont - 1].translation
                for(let i = 0; i < item.children.length; i++) {
                    item.children[i].style.transform = 'rotateY(180deg)'
                }
                item.addEventListener('mouseleave', () => {
                    if (this.elementsCheck.reverseCheck) {
                        item.style.transform = 'rotateY(0deg)'
                        this.elements.cardName[cont - 1].innerHTML = cardsList[this.group][cont - 1].word
                        for(let i = 0; i < item.children.length; i++) {
                            item.children[i].style.transform = 'rotateY(0deg)'
                        }
                    }
                        this.elementsCheck.reverseCheck = false
                        this.elements.switchPick[cont - 1].classList.remove('visable')
                })
            }
        })                
    }

    showSwitchPick () {
        this.elements.buttonSwitch.forEach(item => {
            if(item.classList.contains('visable') && !this.elementsCheck.mainPageCheck) {
                item.classList.remove('visable')
            } else {     
                if(this.elementsCheck.mainPageCheck || this.elementsCheck.switchCheck) {
                    item.classList.add('visable')
                }      
            }
        })
    }

    changePage (id) { 
        if(this.elements.burger.classList.contains('burger__active')) {
            this.openBurger()
        }
    
        if(id.target.id === '1') {
            this.loadCardContent()
            this.showSwitchPick()
            this.removeTable()
        } else if(id.target.id === '10') {
            this.crateTable()
            this.elements.main.classList.add('visable')
            this.elements.table.classList.remove('visable')
        } else {
            this.group = id.target.classList[1]
            this.elementsCheck.mainPageCheck = false
            this.elementsCheck.buttonSwitchCheck = true
            if (this.elementsCheck.tableCheck) {
                this.removeTable()
            }
            for (let i = 0; i < this.elements.cardImages.length; i++) {
                this.elements.cardImages[i].style.background = `center / cover no-repeat url(${cardsList[id.target.classList[1]][i].image})`
                this.elements.cardName[i].innerHTML = cardsList[id.target.classList[1]][i].word
            }
            this.showSwitchPick()
            this.trainPlay()
        }    
    }

    showStatistics () {
        this.elements.main.removeChild(this.elements.main.firstElementChild)
        let wrap = this.elements.main.appendChild(document.createElement('div'))
        wrap.classList.add('wrapper')
    }

    crateTable () {
      this.elementsCheck.tableCheck = true
      let x = 0
      let y = 0
      for (let i = 0; i < 64; i++) {
          if(i % 8 === 0 && i !== 0 && i !== 1) {
              x++
              y = 0
          }
          let sector = this.elements.tableBody.appendChild(document.createElement('tr'))
          for (let c = 0; c < 6; c++) {
              let col = sector.appendChild(document.createElement('td'))
              if (c === 0) {
                  col.innerHTML = cardsList[0][x]
              } else if (c === 1) {
                  col.innerHTML = cardsList[x + 1][y].word
              } else if(c === 2) {
                  col.innerHTML = cardsList[x + 1][y].translation
              }
          }
          y++
      }       
    }

    removeTable () {
        this.elementsCheck.tableCheck = false
        this.elements.main.classList.remove('visable')
        this.elements.table.classList.add('visable')
    }

    audio (e) {
      if (!this.elementsCheck.mainPageCheck && e.currentTarget.classList[1] !== 'off' && !this.elementsCheck.switchCheck) {
          this.elements.audioElement.src = `${cardsList[this.group][e.currentTarget.classList[1] - 1].audioSrc}`
          this.elements.audioElement.play()
      }
    }

    trainPlay () {
        if (this.elementsCheck.switchCheck) {
            if (this.elementsCheck.mainPageCheck) {
                this.gameEnd()
            } else {
                this.elements.startButton.classList.remove('visable')
                this.elements.playSlider.style.left = '85px'
                this.elements.playText.textContent = 'Play'
                this.elements.playText.style.right = '85px'
                if (!this.elementsCheck.mainPageCheck) {
                    this.elements.cardName.forEach(item => {
                        item.classList.add('visable')
                    })
                    this.showSwitchPick()
                }
            }
            
        } else {
            this.elements.score.textContent = ''
            this.elements.cards.forEach(item => {
                item.style.opacity = '1'
            })
            this.elements.playSlider.style.left = '5px'
            this.elements.playText.textContent = 'Train'
            this.elements.playText.style.right = '5px'
            this.elements.startButton.classList.add('visable')
            this.elements.cardName.forEach(item => {
                item.classList.remove('visable')
            })
            this.showSwitchPick()
        }
    }

    game () {
        this.arr = []
        cardsList[this.group].forEach (item => {
            this.arr.push(item.audioSrc)
        })
        this.arr.sort(() => Math.random() - 0.5)
        this.index = 0
        this.gameTrue()
    }

    gameTrue () {
        this.elements.cards.forEach(item => {
            item.removeEventListener('click', this.handlerShim)
        })
        if (this.index === 8) {
            this.gameEnd(this.elements.score.textContent)
        } else {
            this.elements.audioElement.src = this.arr[this.index]
            setTimeout(() => {
                this.elements.audioElement.play()
            }, 1000);
            this.elements.cards.forEach(item => {
                item.addEventListener('click', this.handlerShim)
            })
        }
    }
    
    gameTrueEvent (e) {
        if (cardsList[this.group][e.currentTarget.classList[1] - 1].audioSrc === this.arr[this.index]) {
            this.elements.score.innerHTML += '<div class="star">\n<img src="img/true.png" alt="star" class="star__pick">\n</div>'
            this.elements.audioElement.src = 'audio/true.mp3'
            this.elements.audioElement.play()
            e.currentTarget.style.opacity = '0.5'
            ++this.index
            setTimeout(() => {
                this.gameTrue()
            }, 2000);
        } else {
            if (e.currentTarget.style.opacity !== '0.5') {
                this.elements.audioElement.src = 'audio/error.mp3'
                this.elements.audioElement.play()
                this.mistake++
                this.elements.score.innerHTML += '<div class="star">\n<img src="img/false.png" alt="star" class="star__pick">\n</div>'
            }
        }    
    }

    gameEnd (str) {
        this.elements.endGameImg.src = ''
        this.elements.endGameText.textContent = ''
        this.elements.endPopup.style.display = 'flex'
        if (this.elementsCheck.mainPageCheck) {
            this.elements.endGameText.textContent = 'Пожалуйста, выбирите тему!'
        } else {
            if(this.mistake === 0) {
                this.elements.audioElement.src = 'audio/success.mp3'
                this.elements.audioElement.play()
                this.elements.endGameImg.src = 'img/smile.png'
                this.elements.endGameText.textContent = 'You win'
            } else {
                this.elements.audioElement.src = 'audio/failure.mp3'
                this.elements.audioElement.play()
                this.elements.endGameImg.src = 'img/cry.png'
                this.elements.endGameText.textContent = `${this.mistake} Errors` 
            }
            this.elements.score.textContent = ''
            this.elements.cards.forEach(item => {
                item.style.opacity = '1'
            })
            this.loadCardContent()
            this.elements.playSlider.style.left = '5px'
            this.elements.playText.textContent = 'Train'
            this.elements.playText.style.right = '5px'
            this.elements.startButton.classList.add('visable')
            this.elements.cardName.forEach(item => {
                item.classList.remove('visable')
            }) 
        }
        setTimeout(() => {
            this.elements.endPopup.style.display = 'none'
        }, 3000);
    }

    init () {
        this.loadCardContent()
        for (let i = 0; i < this.elements.menuList.length; i++) {
            let menuItem = this.elements.menuList[i]
            menuItem.addEventListener('click', (e) => {
                this.changePage(e)
                this.group = e.target.id - 1
            })
        }

        this.elements.burger.addEventListener('click', this.openBurger.bind(this))
        
        for (let i = 0; i < this.elements.cards.length; i++) {
            let card = this.elements.cards[i]
            card.addEventListener('click', (e) => {
                this.audio(e)
                if(this.elementsCheck.mainPageCheck) {
                    this.changePage(e)
                    this.group = e.currentTarget.id - 1
                }
            })
        } 
        for (let i = 0; i < this.elements.switchPick.length; i++) {
            let pick = this.elements.switchPick[i]
            pick.addEventListener('click', (e)=>{
                this.reverse(e)
            })
        }
        this.elements.playGame.addEventListener('click', () => {
            this.elementsCheck.switchCheck = !this.elementsCheck.switchCheck
            this.trainPlay()
        })
        
        this.elements.startButton.addEventListener('click', ()=> {
            this.game()
        })
    }   
}


const englishForKIds = new English();
window.addEventListener('DOMContentLoaded', () => {
    englishForKIds.init();
})


















































