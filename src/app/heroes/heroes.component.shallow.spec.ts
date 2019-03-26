import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe("HeroesComponent (shallow tests)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroServices;
  let HEROES;

  @Component({
    selector: "app-hero",
    template: "<div></div>"
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }
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
      declarations: [HeroesComponent, FakeHeroComponent],
      schemas: [],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroServices
        }
      ]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should set heroes correctly from the service", () => {
    mockHeroServices.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it("should create 3 app-hero ", () => {
    mockHeroServices.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css("app-hero")).length).toBe(3);
  });
});
