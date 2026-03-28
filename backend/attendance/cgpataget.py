def cgpa_target_planner():

    MAX_SEM = 8

    # ---- Passed Semester Input ----
    while True:
        passed_sem = int(input("Enter number of semesters passed (Max 8): "))
        if 1 <= passed_sem <= MAX_SEM:
            break
        else:
            print("Invalid! Semesters must be between 1 and 8.")

    sgpas = []

    # ---- SGPA Input ----
    for i in range(1, passed_sem + 1):
        while True:
            sgpa = float(input(f"Enter SGPA of Semester {i} (0-10): "))
            if 0 <= sgpa <= 10:
                sgpas.append(sgpa)
                break
            else:
                print("Invalid SGPA! Enter between 0 and 10.")

    current_total_points = sum(sgpas)
    current_cgpa = current_total_points / passed_sem

    print("\nYour Current CGPA is:", round(current_cgpa, 2))

    # ---- Target Inputs ----
    while True:
        target_cgpa = float(input("\nEnter your Target CGPA (0-10): "))
        if 0 <= target_cgpa <= 10:
            break
        else:
            print("Invalid CGPA! Enter between 0 and 10.")

    while True:
        target_sem = int(input("Enter target semester (Max 8): "))
        if passed_sem < target_sem <= MAX_SEM:
            break
        else:
            print(f"Target semester must be greater than {passed_sem} and ≤ 8.")

    # ---- Calculation ----
    remaining_sem = target_sem - passed_sem

    required_total_points = target_cgpa * target_sem
    required_points = required_total_points - current_total_points

    required_sgpa_each_sem = required_points / remaining_sem

    print("\n=================================")

    if required_sgpa_each_sem > 10:
        print("⚠ Target is mathematically impossible.")
    elif required_sgpa_each_sem < 0:
        print("🎉 You have already achieved your target!")
    else:
        print(f"You must score at least {round(required_sgpa_each_sem, 2)} SGPA")
        print(f"in EACH of the next {remaining_sem} semester(s)")
        print("to achieve your target CGPA.")

    print("=================================")


cgpa_target_planner()