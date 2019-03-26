import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe("HeroDetailComponent", () => {
  let mockActivateRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;
  beforeEach(() => {
    mockActivateRoute = {
      snapshot: { paramMap: { get: () => "3" } }
    };
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivateRoute },
        { provide: HeroService, useValue: mockHeroService }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ name: "b", id: 3, strength: 11 })
    );
  });

  it("should render hero name in a h2 tag", () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "B"
    );
  });
});
