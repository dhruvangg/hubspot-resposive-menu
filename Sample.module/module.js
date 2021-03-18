let slideUp = (target, duration = 500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    //alert("!");
  }, duration);
}

let slideDown = (target, duration = 500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}
var slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}

const menuWrapper = document.querySelector('.custom-menu-primary .hs-menu-wrapper');

document.querySelector('.custom-menu-primary').classList.add("js-enabled")
var MobileTrigger = document.createElement("DIV");
MobileTrigger.classList.add("mobile-trigger")
MobileTrigger.innerHTML = '<i></i>';
document.querySelector('.custom-menu-primary .hs-menu-wrapper').insertAdjacentElement('beforebegin', MobileTrigger);

Array.from(document.querySelectorAll('.custom-menu-primary .hs-menu-wrapper .hs-item-has-children > a')).forEach(el => {
  var ChildTrigger = document.createElement("DIV");
  ChildTrigger.classList.add("child-trigger")
  ChildTrigger.innerHTML = '<i></i>';  
  el.insertAdjacentElement('afterend', ChildTrigger);
})

document.querySelector('.mobile-trigger').addEventListener('click', el => {
  slideToggle(menuWrapper, 250)
  document.querySelector("body").classList.toggle("mobile-open")
  document.querySelector(".child-trigger").classList.remove("child-open")
  Array.from(document.querySelectorAll('.hs-menu-children-wrapper')).forEach(el => { 
    slideUp(el, 250)
  })
  return false;
})

Array.from(document.querySelectorAll('.child-trigger')).forEach(el => { 
  el.addEventListener('click', ele => {
    siblings(ele.currentTarget.parentNode).forEach(sibs => { 
      sibs.querySelector(".child-trigger") && sibs.querySelector(".child-trigger").classList.remove("child-open")
      sibs.querySelector(".hs-menu-children-wrapper") && slideUp(sibs.querySelector(".hs-menu-children-wrapper"), 250)
    })
    if(ele.currentTarget.nextElementSibling) {
      const siblingsChildren = ele.currentTarget.nextElementSibling.querySelector('.hs-item-has-children')
      if(siblingsChildren){
        siblingsChildren.querySelector('.hs-menu-children-wrapper') && slideUp(siblingsChildren.querySelector('.hs-menu-children-wrapper'), 250)  
        siblingsChildren.querySelector('.child-trigger') && siblingsChildren.querySelector('.child-trigger').classList.remove('child-open')  
      }
      slideToggle(ele.currentTarget.nextElementSibling, 250)
    }
    ele.currentTarget.classList.toggle("child-open")
  })
});

function siblings(el){
  return Array.prototype.filter.call(el.parentNode.children, function(child){
    return child !== el;
  });
}
