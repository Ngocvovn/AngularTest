import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

@Directive({
  selector: "[routerLink]",
  host: { "(click)": "onClick()" }
})
export class RouterLinkDirectiveStub {
  @Input("routerLink") linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
describe("HeroesComponent (deep tests)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroServices;
  let HEROES;
  beforeEach(() => {
    HEROES = [
      {
        id: 1,
        name: "a",
        strength: 8
      },
      {
        id: 2,
        name: "b",
        strength: 1
      },
      {
        id: 3,
        name: "c",
        strength: 6
      }
    ];
    mockHeroServices = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroServices
        }
      ]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render each hero as a HeroComponent", () => {
    mockHeroServices.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponents.length).toBe(HEROES.length);
    for (let i = 0; i < HEROES.length; i++) {
      expect(heroComponents[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it("should call heroService.deleteHero when the Hero Component delet button is clicked", () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroServices.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponents[0]
      .query(By.css("button"))
      .triggerEventHandler("click", { stopPropagation: () => {} });
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });
  it("should call heroService.deleteHero when the Hero Component delet button is clicked 2", () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroServices.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it("should add new hero when the add button is clicked", () => {
    mockHeroServices.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const name = "Mr. Ice";
    mockHeroServices.addHero.and.returnValue(
      of({ id: 5, name: name, strength: 11 })
    );

    const inputElement = fixture.debugElement.query(By.css("input"))
      .nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css("button"))[0];
    inputElement.value = name;
    addButton.triggerEventHandler("click", null);
    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css("ul")).nativeElement
      .textContent;
    expect(heroText).toContain(name);
  });

  it("should have correct route for first hero", () => {
    mockHeroServices.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css("a")).triggerEventHandler("click", null);
    expect(routerLink.navigatedTo).toBe("/detail/1");
  });
});
