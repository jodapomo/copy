import {
    trigger,
    query,
    style,
    animate,
    transition,
    animateChild,
    group,
} from '@angular/animations';


const nextAnimation = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter',  [
    style({ left: '100%'})
  ], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '-100%'}))
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%'}))
    ], { optional: true })
  ]),
  query(':enter', animateChild(), { optional: true }),
];

const backAnimation = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({ left: '-100%'})
  ], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '100%'}))
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%'}))
    ], { optional: true })
  ]),
  query(':enter', animateChild(), { optional: true }),
]

export const slideHomeRouterAnimation =
  trigger('routeAnimations', [

    transition('1 => *, 2 => 3', nextAnimation),

    transition('* => 1, 3 => 2', backAnimation),

  ]);

